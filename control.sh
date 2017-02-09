#!/bin/bash


start ()
{
	npm run  start:prod
}

stop ()
{
	npm run stop:prod
}

restart ()
{
	startAppCorrectly
}

startAppCorrectly ()
{
  npm install
  npm run stop:prod
  npm run start:prod
}

# MAIN

CURR_DIR=`pwd`

action=$1
export NODE_ENV=$2

if [ $NODE_ENV == "development" ]
then
	export SHARED_APP_DIR="./"
	export APP_CWD="./"
else
	export SHARED_APP_DIR="../../shared/"
	export APP_CWD="/home/admin/apps/rollout_dashboard/current"
fi

case "$action" in
	stop)
		stop
	;;
	start)
		start
	;;
	restart)
		restart
	;;
esac