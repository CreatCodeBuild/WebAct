# coding:utf8

import cv2
import numpy as np


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
    # image = cv2.imread('demo4.jpg')
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

    cv2.imwrite('lineremoved.jpg', threshed)

if __name__ == '__main__':
    image = cv2.imread('demo4.jpg')
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

    cv2.imshow('lines', threshed)
    cv2.waitKey()
    cv2.imwrite('lineremoved.jpg', threshed)
