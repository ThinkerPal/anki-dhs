#!/usr/bin/env python3

# To be executed only from npm scripts or from the root of the project folder

import os 
import sys

os.chdir("backend/")

if sys.platform == "win32":
    os.system("rm ankibackend.exe && rm -r build")
    os.system("rm ankibackend && rm -r build && pyinstaller --clean --onefile --add-binary \"db\\backend.db;db\" --exclude=tkinter --hidden-import requests --distpath . --name ankibackend backend.py")
else: # Currently using 
    os.system("rm ankibackend && rm -r build")
    try: 
        a = os.environ["CODESIGN_ANKI"]
    except:
        os.system("pyinstaller --clean --osx-entitlements-file ../build/entitlements.mac.plist --osx-bundle-identifier me.thinkerpal.dhs.anki22 --onefile --add-binary db/backend.db:db --exclude=tkinter --hidden-import requests --distpath . --name ankibackend backend.py")
    else:
        
        os.system(f"pyinstaller --clean --osx-entitlements-file ../build/entitlements.mac.plist --osx-bundle-identifier me.thinkerpal.dhs.anki22 --codesign-identity {os.environ['CODESIGN_ANKI']} --onefile --add-binary db/backend.db:db --exclude=tkinter --hidden-import requests --hidden-import flask-cors --distpath . --name ankibackend backend.py")