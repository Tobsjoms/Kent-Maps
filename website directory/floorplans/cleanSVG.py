#!/usr/bin/env python

from lxml import etree
import re
import os
import sys

# Regex
re_transform = re.compile('([a-zA-Z]+)\((-?\d+\.?\d*),?\s*(-?\d+\.?\d*)?\)')
re_translate = re.compile('\((-?\d+\.?\d*)\s*,?\s*(-?\d+\.?\d*)\)')
re_coord_split = re.compile('\s+|,')
re_path_coords = re.compile('[a-zA-Z]')
re_path_split = re.compile('([ACHLMQSTVZachlmqstvz])')
re_trailing_zeros = re.compile('\.(\d*?)(0+)$')
re_length = re.compile('^(\d+\.?\d*)\s*(em|ex|px|in|cm|mm|pt|pc|%|\w*)')



# Attribute names
value_attributes = ["x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry", "width", "height"]
default_styles = set([
    ("opacity", "1"),
    ("fill-opacity", "1"),
    ("stroke", "none"),
    ("stroke-width", "1"),
    ("stroke-opacity", "1"),
    ("stroke-miterlimit", "4"),
    ("stroke-linecap", "butt"),
    ("stroke-linejoin", "miter"),
    ("stroke-dasharray", "none"),
    ("stroke-dashoffset", "0"),
    ("font-anchor", "start"),
    ("font-style", "normal"),
    ("font-weight", "normal"),
    ("font-stretch", "normal"),
    ("font-variant", "normal")
])



STYLES = set([
"alignment-baseline",
"baseline-shift",
"clip-path",
"clip-rule",
"color-interpolation",
"color-interpolation-filters",
"color-profile",
"color-rendering",
"direction",
"dominant-baseline",
"fill",
"fill-opacity",
"fill-rule",
"font",
"font-family",
"font-size",
"font-size-adjust",
"font-stretch",
"font-style",
"font-variant",
"font-weight",
"glyph-orientation-horizontal",
"glyph-orientation-vertical",
"image-rendering",
"kerning",
"letter-spacing",
"marker",
"marker-end",
"marker-mid",
"marker-start",
"mask",
"opacity",
"pointer-events",
"shape-rendering",
"stop-color",
"stop-opacity",
"stroke",
"stroke-dasharray",
"stroke-dashoffset",
"stroke-linecap",
"stroke-linejoin",
"stroke-miterlimit",
"stroke-opacity",
"stroke-width",
"text-anchor",
"text-decoration",
"text-rendering",
"unicode-bidi",
"word-spacing",
"writing-mode",
])

class CleanSVG:
    def __init__(self, svgfile=None, verbose=False):
        self._verbose = verbose
        self.tree = None
        self.root = None

        # Need to update this if style elements found
        self.styles = {}
        self.style_counter = 0

        self.num_format = "%s"
        self.removeWhitespace = True

        if svgfile:
            self.parseFile(svgfile)

    def parseFile(self, filename):
        try:
            self.tree = etree.parse(filename)
        except IOError:
            print "Unable to open file", filename
            sys.exit(1)

        self.root = self.tree.getroot()




    def write(self, filename):
        """ Write current SVG to a file. """

        if not filename.endswith('.svg'):
            filename += '.svg'

        with open(filename, 'w') as f:
            f.write(self.toString(True))

    def toString(self, pretty_print=False):
        """ Return a string of the current SVG """

        if self.styles:
            self._addStyleElement()

        if self.removeWhitespace:
            svg_string = etree.tostring(self.root)
            svg_string = re.sub(r'\n\s*' , "", svg_string)
        else:
            svg_string = etree.tostring(self.root, pretty_print=pretty_print)

        return svg_string




    def removeAttribute(self, attribute, exception_list= []):
        """ Remove all instances of an attribute ignoring any with a value in the exception list. """

        if exception_list is None: exception_list = []

        if self._verbose: print '\nRemoving attribute: %s' % attribute

        for element in self.tree.iter():
            if attribute in element.attrib.keys() and element.attrib[attribute] not in exception_list:
                if self._verbose: print ' - Removed attribute: %s="%s"' % (attribute, element.attrib[attribute])
                del element.attrib[attribute]



    def removeNonDefIDAttributes(self):
        """ Go through def elements and find IDs referred to, then remove all IDs except those. """

        def_IDs = []

        for element in self.tree.iter():
            if not isinstance(element.tag, basestring):
                continue

            tag = element.tag.split('}')[1]
            if tag == 'defs':
                for child in element.getchildren():
                    for key, value in child.attrib.iteritems():
                        if key.endswith('href'):
                            def_IDs.append(value)

        self.removeAttribute('id', exception_list=def_IDs)


    def extractStyles(self):
        """ Remove style attributes and values of the style attribute and put in <style> element as CSS. """

        for element in self.tree.iter():
            style_list = []

            if "style" in element.keys():
                styles = element.attrib["style"].split(';')
                style_list.extend([tuple(style.split(':')) for style in styles])
                del element.attrib["style"]

            for attribute in STYLES & set(element.attrib.keys()):
                style_list.append((attribute, element.attrib[attribute]))
                del element.attrib[attribute]

            if len(style_list) > 0:
                # Ensure styling is in the form: (key, value)
                style_list = [style for style in style_list if len(style)==2]

                # Remove pointless styles, e.g. opacity = 1
                for default_style in default_styles & set(style_list):
                    style_list.remove(default_style)

                # Clean decimals:
                for i, (style_name, style_value) in enumerate(style_list):
                    number = re_length.search(style_value)
                    if number:
                        clean_number = self._formatNumber(number.group(1))
                        style_list[i] = (style_name, clean_number + number.group(2))

                style_tuple = tuple(style_list)
                if style_tuple not in self.styles:
                    style_class = "style%d" % self.style_counter
                    self.styles[style_tuple] = style_class
                    self.style_counter += 1
                else:
                    style_class = self.styles[style_tuple]

                # Should test to see whether there is already a class
                element.set("class", style_class)

def main(filename):
    svg = CleanSVG(filename, verbose=False)
    #svg.removeAttribute('id')
    svg.removeNamespace('sodipodi')
    svg.removeNamespace('inkscape')
    svg.removeNamespace('xml')
    svg.removeNonDefIDAttributes()
    #svg.removeGroups()
    svg.setDecimalPlaces(2)
    #svg.extractStyles()
    svg.applyTransforms()

    #svg.removeWhitespace = False;

    name = os.path.splitext(filename)[0]
    svg.write('%s_test.svg' % name)

if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        main(os.path.join('examples', 'paths.svg'))
        #main(os.path.join('examples', 'styles.svg'))
