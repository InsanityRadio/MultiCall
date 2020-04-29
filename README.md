# MultiCall

MultiCall is an application, built atop the Asterisk PBX, which provides an interface for running a talkshow or radio phone-in.

## How It Works

Incoming calls are routed to Asterisk extension 6000. This extension will find a free channel in the range of 6001-6006 (or how many lines are configured for this install), and ring it. 

The operator is presented with a list of incoming lines, and a list of devices on the left that can receive calls - these are our endpoints. The devices may include Operator (the production PC where the user might have a headset), Phone 1 and Phone 2 - a pair of mix-minus channels on a mixer. 

If you have multiple operators, you currently need to set up a new device in the configuration for each one. A future release may allow two or more concurrent operators to take calls without showing many devices on the left. 

Upon first load, a user can configure what devices (if any) should be a local endpoint. On your studio computer, you may set up two mix-minus channels. 

An operator may answer an incoming call by tapping or clicking on the line. This will route the call to whatever device is selected on the left. For a producer, "Operator" should always be selected, but this mechanism will allow a producer to control which line is on which endpoint in the studio. 

An active call has several options. These are listed in order from left to right:
* Pin - place the caller on hold for later. This can be used to screen a good caller, as pinned lines will turn green. 
* Transfer - in on-air mode, route the call to the next available On-Air device. 
* Block - disconnect the call and immediately block the number. This can be used to ban callers. 
* Disconnect - immediately terminate the call and free the line for another call. 

A pinned call has several options. These are listed in order from left to right:
* Answer - route the call to the device/endpoint selected on the left. Can also be used to transfer a call to an on-air device if it has been selected.
* Disconnect - immediately terminate the call and free the line.

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

The code is [copyright Insanity Radio](https://www.gnu.org/licenses/agpl-3.0.en.html), and licensed under GNU AGPL v3.
