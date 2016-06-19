.PHONY: upload

build:
	ionic build android

debug_browser:
	ionic serve -c -s

debug_device:
	ionic run android -s -c -l

deploy_web:
	backand sync --app socialtest1 --master cf37b110-88ed-4e40-a143-ef9234c37737 --user 74f10962-053a-11e6-b112-0ed7053426cb --folder www
