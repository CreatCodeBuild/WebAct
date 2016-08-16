# -*- coding: utf-8 -*-

import cv2
import numpy as np
import sys
import io


"""
这是一个用Python写的图像预处理模组。
该模组将图片转化为二值图，然后将图片中的长线条移除。
再将处理过后的图片传回给NodeJS。

本模组使用到了OpenCV 3.0 Python2.7 版本
"""


def gray(im):
    '''
    @param: im, image的缩写，一个OpenCV可识别的图片
    @return: im的灰度图
    '''
    return cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)


def threshold(im_gray, method):
    '''
    得到一张灰度图，通过thresholding的方法，得到二值图返回
    有三种不同的thresholding方法，具体的参见OpenCV文档
    '''
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
    '''
    检测这张图片里面的横线和纵线，返回这些线条
    '''
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


def process_image(image_buffer):
    '''
    receive image from client. remove lines. send processed image back
    '''

    # print to debug
    print('type:', type(image_buffer), 'len:', len(image_buffer))
    # construct image from binary buffer/file stream or whatever abstraction you see
    np_array = np.frombuffer(image_buffer, dtype='uint8')
    print('type:', type(np_array), 'len:', len(np_array))

    # read image from raw data
    grayscale_image = cv2.imdecode(np_array, cv2.IMREAD_GRAYSCALE)

    # process the received image
    threshed = process_an_image(grayscale_image)
    remove_lines(threshed)
    # cv2.imshow('', threshed)  # debug
    # cv2.waitKey()


    ret, buffer_of_image = cv2.imencode('.jpg', threshed)
    buffer_string = buffer_of_image.tostring()
    list_of_byte = list(buffer_string)

    print('type:', type(buffer_of_image), 'len:', len(buffer_of_image))  # debug
    print('type:', type(list_of_byte), 'len:', len(list_of_byte))
    print('type:', type(buffer_string), 'len:', len(buffer_string))

    return buffer_string


if __name__ == '__main__':
    server_up()

    def test():
        '''
        用来做测试的函数，仅调试所用
        '''
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
