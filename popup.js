// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/* global Vue, chrome, axios */
var app = new Vue({
  el: "#vue-app",
  data: function() {
    return {
      message: "My mesh events!",
      eventName: "Hmmm you might need to type it...",
      eventTime: "",
      eventDate: "",
      eventLocation: "",
      tabUrl: ""
    };
  },
  mounted: function() {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function(tabs) {
        this.tabUrl = tabs[0].url;

        // get the HTML from the current tab and console.log it
        axios.get(this.tabUrl).then(
          function(response) {
            var htmlString = response.data;
            var template = document.createElement("div");
            template.innerHTML = htmlString;
            this.eventName = template.querySelector("title").innerHTML;
            this.eventTime = template.querySelector(".event-time").innerHTML;
            // this.eventDate = template.querySelector(
            //   ".date-not-today"
            // ).innerHTML;
            this.eventLocation = template.querySelector(
              ".address-line-1"
            ).innerHTML;
          }.bind(this)
        );
      }.bind(this)
    );
  },
  methods: {
    submitExtensionEvent: function(inputExtensionEvent) {
      var params = {
        name: inputExtensionEvent.eventName,
        date: inputExtensionEvent.eventDate,
        location: inputExtensionEvent.eventLocation,
        url: inputExtensionEvent.tabUrl
      };
      axios
        .post("/v1/extension_attended_events", params)
        .then(function(response) {
          console.log(response.data);
        });
    }
  }
});
