
from cleanSVG import CleanSVG
import os



input_file = open("/Users/Tobsjoms/desktop/ground_floor.svg", "w")

#input_file = ("ground_floor.svg")
output_file = "test.svg"



svg = CleanSVG(input_file)
svg.removeAttribute('style')
svg.write(output_file)
