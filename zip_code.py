import zipfile
import os

# add more dirs ....
dirs = ['bower_components', 'images', 'options', 'dist', 'icons', 'js', 'vendor', \
        'public/stylesheets/']

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))


zf = zipfile.ZipFile('code.zip', 'w')
for d in dirs:
    zipdir(d, zf)

# if you want to add more file
zf.write('index.html')
zf.write('background.html')
zf.write('manifest.json')
zf.write('note.js')
zf.write('public/javascripts/dist/index.js')

zf.close()
print ('done')
