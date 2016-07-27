# coding:utf8

import cv2
import numpy as np
import sys
import zerorpc


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


        print('type:', type(image_buffer), 'len:', len(image_buffer))
        for c in image_buffer:
            print('type of element:', type(c))
        image_buffer = ''.join(image_buffer)
        np_array = np.frombuffer(image_buffer, dtype='uint8')
        image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
        cv2.imshow('', image)
        cv2.waitKey()
        grayed = gray(image)
        print(1)
        threshed = threshold(~grayed, 'mean')
        print(2)
        v_lines, h_lines = line_detect(threshed)
        color = (0, 0, 0)
        for line in v_lines:
            for x1, y1, x2, y2 in line:
                cv2.line(threshed, (x1, y1), (x2, y2), color, 3)
        for line in h_lines:
            for x1, y1, x2, y2 in line:
                cv2.line(threshed, (x1, y1), (x2, y2), color, 3)
        retval, buffer = cv2.imencode('.jpg', threshed)
        print('type:', type(buffer), 'len:', len(buffer))
        # need to convert numpy ndarray to python list
        # or any zerorpc seriallizable object
        # int8 list?
        return buffer.tostring()


def server_up():
    server = zerorpc.Server(StreamingRPC())
    server.bind("tcp://0.0.0.0:8888")  # listen for local address
    server.run()


if __name__ == '__main__':
    server_up()

    # debug purpose
    # image = cv2.imread(str(sys.argv[1]))
    # grayed = gray(image)
    # threshed = threshold(~grayed, 'mean')
    #
    # v_lines, h_lines = line_detect(threshed)
    #
    # color = (0, 0, 0)
    # for line in v_lines:
    #     for x1, y1, x2, y2 in line:
    #         cv2.line(threshed, (x1, y1), (x2, y2), color, 3)
    # for line in h_lines:
    #     for x1, y1, x2, y2 in line:
    #         cv2.line(threshed, (x1, y1), (x2, y2), color, 3)
    #
    # cv2.imshow('lines', threshed)
    # cv2.waitKey()
    # cv2.imwrite('lineremoved.jpg', threshed)

    # didn't find out why this didn't work
    # retval, buffer = cv2.imencode('.png', threshed)
    # for b in buffer:
    #     sys.stdout.write(b)
