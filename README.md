Version: 1.0

Current Functionality:
* popup controls activation/deactivation of extension.
* when the user tries to open a blacklisted site, it is automatically closed (existing blacklisted sites remain open until they are reloaded).
* block existing webpages without deleting them (redirects to block page)
    * when popup deactived, returns websites to original url

Known Issues:
* first tab opened after activation of popup doesn't get closed. all future ones do.
    * reloading does not block/close tab either. id is lost? idk.