###
Copyright 2015 Jan Svager & Michael Muller

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###

exports.getImageData = (image) ->
  canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
  return context.getImageData(0, 0, image.width, image.height)

exports.getPixel = (imageData, x, y) ->
  position = ( x + imageData.width * y ) * 4
  data = imageData.data
  return {r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3]}