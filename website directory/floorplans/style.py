
from cleanSVG import CleanSVG
import os
import shutil




input_file = ("Cornwallis-SW-GF.svg", "w")

#input_file = ("ground_floor.svg")
#output_file = "test.svg"

destination = "/Users/Tobsjoms/documents/project/kent-maps/website-directory/floorplans/test.svg"

dest = shutil.copyfile("Cornwallis-SW-GF.svg", "test.svg")




svg = CleanSVG("test.svg")
svg.removeAttribute('style')
svg.write("test.svg")


