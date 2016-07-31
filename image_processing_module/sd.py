# coding:utf8

import cv2
import numpy as np
import sys
import zerorpc
import StringIO


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


def run():
    file = sys.argv[1]
    image = cv2.imread(file)
    grayed = gray(image)
    threshed = threshold(~grayed, 'mean')

    v_lines, h_lines = line_detect(threshed)

    color = (0, 0, 0)
    for line in v_lines:
        for x1, y1, x2, y2 in line:
            cv2.line(threshed, (x1, y1), (x2, y2), color, 3)
    for line in h_lines:
        for x1, y1, x2, y2 in line:
            cv2.line(threshed, (x1, y1), (x2, y2), color, 3)

    cv2.imwrite('temp.jpg', threshed)


def process_an_image(image):
    # cv2.imshow('', image)
    # cv2.waitKey()
    grayed = gray(image)
    print(1)
    threshed = threshold(~grayed, 'mean')
    print(2)
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



class StreamingRPC():
    @zerorpc.stream
    def process_image(self, image_buffer):
        '''
        receive image from client. remove lines. send processed image back
        '''
        # i should consider this link
        # http://stackoverflow.com/questions/11552926/how-to-read-raw-png-from-an-array-in-python-opencv
        # it provides useful info
        # convert raw binary data to OpenCV acceptable image object

        # print to debug
        print('type:', type(image_buffer), 'len:', len(image_buffer))
        for c in image_buffer:
            print('type of element:', type(c))
        # debug end

        # construct image from binary buffer/file stream or whatever abstraction you see
        image_buffer = ''.join(image_buffer)
        np_array = np.frombuffer(image_buffer, dtype='uint8')
        image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

        # process the received image
        threshed = process_an_image(image)
        remove_lines(threshed)

        retval, buffer_of_image = cv2.imencode('.jpg', threshed)

        print('type:', type(buffer), 'len:', len(buffer))  # debug

        # need to convert numpy ndarray to python list
        # or any zerorpc seriallizable object
        # int8 list?
        tostring = buffer_of_image.tostring()
        print('len:', len(tostring))
        return tostring


def server_up():
    server = zerorpc.Server(StreamingRPC())
    server.bind("tcp://0.0.0.0:8888")  # listen for local address
    server.run()


if __name__ == '__main__':
    # server_up()

    # debug purpose
    # process the received image
    image = cv2.imread('demo4.jpg')
    threshed = process_an_image(image)
    remove_lines(threshed)
    # cv2.imshow('', threshed)
    # cv2.waitKey()

    retval, buffer_of_image = cv2.imencode('.jpg', threshed)
    print(retval)

    print('type:', type(buffer_of_image), 'len:', len(buffer_of_image))  # debug

    # need to convert numpy ndarray to python list
    # or any zerorpc seriallizable object
    # int8 list?
    data = np.array(buffer_of_image)
    tostring = data.tostring()
    # tostring = buffer_of_image.tostring()

    with open('temp.jpg', 'wb') as f:
        print('type:', type(tostring), 'len:', len(tostring))
        f.write(tostring)

    # Close object and discard memory buffer --
    # .getvalue() will now raise an exception.
    # output.close()

    #decode from jpeg format
    decimg = cv2.imdecode(buffer_of_image, 1)

    cv2.imshow('Source Image', threshed)
    cv2.imshow('Decoded image', decimg)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    # cv2.imwrite()
