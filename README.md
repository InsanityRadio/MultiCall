# MultiCall

MultiCall is an application, built atop the Asterisk PBX, which provides an interface for running a talkshow or radio phone-in.

## Initial Setup

To run the application, you must install a copy of Asterisk PBX. You will probably find it frustrating to configure unless on the same LAN. Docker networking seems to interfere with RDP traffic, so running Asterisk inside Docker is not yet recommended.

You will need to deploy Asterisk with SSL/TLS certificates. It is recommended (if you are using IPs) to create your own Certificate Authority, issue Asterisk a certificate, then import the CA root certificate onto your machines. 

Next, copy the files from `contrib/asterisk/*.conf` to your `/etc/asterisk` configuration directory. Make sure you EDIT these files first to change the IP addresses, and the passwords that are used in development to authenticate to Asterisk. Restart Asterisk. You may, at the moment, see references to Insanity IP space. 

Next, spin up the ARI server (interactive Asterisk application) by running `node server`. You will need to edit `server/index.js` to fill in your Asterisk IP. Node will listen on port 3000 by default, but this can be overridden by specifying one like `PORT=XXXX node server`. 

Edit `src/App.js` and change WS_HOST and SERVER to point to your SIP server and the node application. 

Run `npm start` to boot the web application. You should see the setup screen. 

## Configuration

There is no configuration mechanism at the moment. Edit `server/index.js` to specify ROUTE_MAPs. You may need to change your Asterisk configuration to mirror your changes. 

## License

The code is currently unlicensed. Application code is copyright Insanity Radio, all rights reserved. You must seek permission before using or distributing this code.
