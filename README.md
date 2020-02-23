# RTC-chat-app-using-WebSockets
A small chat built that uses WebSockets as the backbone

This is a small messaging application what I wrote to understand how to use the ever growinng popularity of this technology.

It features desktop and mobile versions.

## Prerequisites
You must have Node JS installed on your computer.

## Use
First, you need to start the server that will handle the message broadcasting between the useers, open a terminal and type:
  > node server.js
  
Once you have done that, just deploy the desktop and mobile versions as you please and then open the file named 'index.html' in the device where you want to use it, you will be presented with a text box where you should write your message and a button to send the message to the server.

The server will be giving you all the indications you need to succesfully connect with another user, both users needs to be connected so the conversation can start.

Currently it only supports conversations of two users.

## Built with
- [Node JS](https://nodejs.org/es/) - The JS runtime environment used to write native application for dekstop.
- [WebSockets Library](https://www.npmjs.com/package/ws) - The WebSockets implementation used to handle the communications.

## Contributing

If you want to contribute to this project you're more than welcome, just send a pull request and you are done!

## Authors

* **Amit Karamchandani Batra** - [RYSKZ](https://github.com/RYSKZ)

## License

This project is licensed under the GNU v3.0 License.
