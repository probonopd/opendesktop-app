#!/bin/bash

if [ -f './opendesktop-app-linux-x64/opendesktop-app' ]; then
    ./opendesktop-app-linux-x64/opendesktop-app
elif [ -f '/usr/local/lib/opendesktop-app-linux-x64/opendesktop-app' ]; then
    /usr/local/lib/opendesktop-app-linux-x64/opendesktop-app
elif [ -f '/usr/lib/opendesktop-app-linux-x64/opendesktop-app' ]; then
    /usr/lib/opendesktop-app-linux-x64/opendesktop-app
else
    exit 1
fi
