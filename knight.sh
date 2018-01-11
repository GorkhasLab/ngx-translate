#!/usr/bin/env bash
# Bash Menu Script Example
ROOT_DIR=$PWD
DIST_DIR=target
echo "Building From ${ROOT_DIR}"
PS3='Please enter your choice: '
options=("Normal Build" "Normal build and publish" "Run App" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Normal Build")
            echo "you chose 'Normal Build'"
            npm run build && cd ${ROOT_DIR}/${DIST_DIR} && yarn pack && cd ${ROOT_DIR}
            ;;
        "Normal build and publish")
            echo "you chose 'Normal build and publish'"
            printf 'New Version [] : '
            read newVersion
            sed -i -E "s/\"version\":.*[^,]/\"version\":\"${newVersion}\"/g" package.json
            sed -i -E "s/\"version\":.*[^,]/\"version\":\"${newVersion}\"/g" src/app/package.json
            sed -i -E "s/\"version\":.*[^,]/\"version\":\"${newVersion}\"/g" src/app/ng-package.json
            npm run build && cd ${ROOT_DIR}/${DIST_DIR} && yarn publish && cd ${ROOT_DIR}
            ;;
        "Run App")
            echo "you chose 'Run App'"
            npm run start
            ;;
        "Quit")
            break
            ;;
        *) echo invalid option;;
    esac
done
