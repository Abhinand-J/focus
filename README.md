Version: 1.0

Current Functionality:
* blocks existing webpages without deleting them (redirects to block page)
    * when popup deactived, returns websites to original url
* newly created tabs that fall under blacklist are automatically closed
* popup controls all functionality:
    * activates/deactivates extension
    * allows user to update blocked sites (add/remove)
        * only the base list (stored in block-list.js) is maintained between sessions