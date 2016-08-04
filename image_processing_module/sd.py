import cv2
import numpy as np
import zerorpc
import sys
import io


def gray(im):
    return cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)


def threshold(im_gray, method):

    if method == 'fixed':
        threshed_im = cv2.threshold(im_gray, 128, 255, cv2.THRESH_BINARY)

    elif method == 'mean':
        threshed_im = cv2.adaptiveThreshold(im_gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 15, -22)

    elif method == 'gaussian':
        threshed_im = cv2.adaptiveThreshold(im_gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 5, 7)

    else:
        return None

    return threshed_im


def line_detect(im):
    v_lines = cv2.HoughLinesP(im, 1, np.pi,
                              threshold=50,
                              minLineLength=50,
                              maxLineGap=0)

    h_lines = cv2.HoughLinesP(im, 1, np.pi/2,
                              threshold=100,
                              minLineLength=50,
                              maxLineGap=0)

    return v_lines, h_lines


def process_an_image(grayed):
    # threshold it
    threshed = threshold(~grayed, 'mean')
    return threshed


def remove_lines(threshed_image):
    """
    :param threshed_image: OpenCV image
    :return: void, this function writes on threshed_image
    """
    v_lines, h_lines = line_detect(threshed_image)
    color = (0, 0, 0)  # color to override on threshed image, in order to cover lines
    for line in v_lines:
        for x1, y1, x2, y2 in line:
            cv2.line(threshed_image, (x1, y1), (x2, y2), color, 3)
    for line in h_lines:
        for x1, y1, x2, y2 in line:
            cv2.line(threshed_image, (x1, y1), (x2, y2), color, 3)


def string_to_list(string):
    _list = []
    for i in range(0, len(string), 8192):
        if i+8192 <= len(string):
            _list.append(string[i:i+8192])
        else:
            _list.append(string[i:])
    if len(string) != sum([len(x) for x in _list]):
        raise Exception('wrong')
    else:
        return _list

class StreamingRPC():
    def process_image(self, image_buffer):
        '''
        receive image from client. remove lines. send processed image back
        '''

        # print to debug
        print('type:', type(image_buffer), 'len:', len(image_buffer))
        # construct image from binary buffer/file stream or whatever abstraction you see
        image_buffer = ''.join(image_buffer)
        np_array = np.frombuffer(image_buffer, dtype='uint8')

        # read image from raw data
        grayscale_image = cv2.imdecode(np_array, cv2.IMREAD_GRAYSCALE)

        # process the received image
        threshed = process_an_image(grayscale_image)
        remove_lines(threshed)
        # cv2.imshow('', threshed)
        # cv2.waitKey()


        ret, buffer_of_image = cv2.imencode('.jpg', threshed)
        list_of_byte = list(buffer_of_image.tostring())

        print('type:', type(buffer_of_image), 'len:', len(buffer_of_image))  # debug
        print('type:', type(list_of_byte), 'len:', len(list_of_byte))

        # test_output(buffer_of_image)
        print(list_of_byte[-1234].encode('hex'))
        return buffer_of_image.tostring()

    def test(self, string):
        print(len(string), string)
        print(type(string))
        print(string.encode('hex'))
        print('ÿ')
        return string


def test_output(buffer):
    with open('temp2.jpg', 'w+b') as f:
        f.write(buffer)


def server_up():
    server = zerorpc.Server(StreamingRPC())
    server.bind("tcp://0.0.0.0:8888")  # listen for local address
    server.run()


if __name__ == '__main__':
    server_up()

    def test():
        # debug purpose
        # process the received image
        image = cv2.imread('demo4.jpg', cv2.IMREAD_GRAYSCALE)
        threshed = process_an_image(image)
        remove_lines(threshed)
        cv2.imshow('', threshed)
        cv2.waitKey()

        ret, buffer_of_image = cv2.imencode('.jpg', threshed)
        print(ret)

        print('type:', type(buffer_of_image), 'len:', len(buffer_of_image))  # debug

        tostring = buffer_of_image.tostring()  # maybe too lines of buffer reshaping are redundant, maybe

        with io.open(sys.stdout, 'w+b') as f:
            print('type:', type(tostring), 'len:', len(tostring))
            f.write(tostring)
        print tostring,


    # test()
