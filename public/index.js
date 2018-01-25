/* global Vue, VueRouter, axios, Elevator, jQuery, initTheme, google*/
var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      events: [],
      eventFilter: "",
      sortAttribute: "",
      sortAscending: true
    };
  },
  mounted: function() {
    axios.get("/v1/events?count=16").then(
      function(response) {
        this.events = response.data;
        console.log("mounted", this.events);
      }.bind(this)
    );
    initTheme();
  },
  methods: {
    eventInfo: function(event) {
      axios.get("/v1/events").then(
        function(response) {
          this.events = response.data;
          // console.log(this.events);
        }.bind(this)
      );
    },
    saveEvent: function(inputEvent) {
      // console.log("inputEvent is:", inputEvent);
      var params = {
        api_event_id: inputEvent.id,
        name: inputEvent.name,
        date: inputEvent.local_date,
        location: inputEvent.venue ? inputEvent.venue.name : "(no venue)",
        image: inputEvent.description_images[0]
        // ? inputEvent.description_images[0]
        // : "img/events/event1.jpg"
      };
      axios.post("/v1/attended_events", params);
    },
    nameFilter: function(inputEvent) {
      return inputEvent.name
        .toLowerCase()
        .includes(this.eventFilter.toLowerCase());
    },
    loadMore: function() {
      axios.get("/v1/events?count=30").then(
        function(response) {
          this.events = response.data;
          console.log("mounted", this.events);
        }.bind(this)
      );
    }
  },
  computed: {
    sortedEvents: function() {
      return this.events.sort(
        function(event1, event2) {
          if (this.sortAscending === true) {
            return event1[this.sortAttribute] > event2[this.sortAttribute];
          } else {
            return event1[this.sortAttribute] < event2[this.sortAttribute];
          }
        }.bind(this)
      );
    }
  },
  filters: {
    shortDescription: function(text) {
      var maxLength = 100;
      if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
      } else {
        return text;
      }
    }
  }
};

var AttendedeventsPage = {
  template: "#attendedevents-page",
  data: function() {
    return {
      attended_events: [],
      selected_attended_event: {},
      tidbit: ""
    };
  },
  created: function() {
    axios.get("/v1/attended_events").then(
      function(response) {
        this.attended_events = response.data;
        console.log(this.attended_events);
      }.bind(this)
    );
    // axios.get("/v1/attended_events/text"); #this is for when my text method is used in the attended eventes controller
  },
  mounted: function() {
    // runThemeJavaScript();
    // initTheme();
  },
  methods: {
    submitTidbit: function() {
      console.log(
        "submitTidbit",
        this.selected_attended_event.name,
        this.tidbit
      );
      var params = {
        attended_event_id: this.selected_attended_event.id,
        tidbit: this.tidbit
      };
      axios.post("/v1/event_tidbits", params).then(
        function(response) {
          console.log(response.data);
          this.selected_attended_event.tidbits.push(response.data);
          this.tidbit = "";
        }.bind(this)
      );
    }
  },
  computed: {},
  filters: {
    shortDescription: function(text) {
      var maxLength = 100;
      if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
      } else {
        return text;
      }
    }
  }
};

var EventInfoPage = {
  template: "#eventinfo-page",
  data: function() {
    return {
      event: { venue: {} }
    };
  },
  created: function() {},
  mounted: function() {
    console.log("event info mounted");

    console.log("EventInfoPage created", this.$route.query);
    axios
      .get(
        "/v1/events/" +
          this.$route.params.id +
          "/?urlname=" +
          this.$route.query.urlname
      )
      .then(
        function(response) {
          this.event = response.data;
          console.log(this.event);
          this.setupMap();
        }.bind(this)
      );
  },
  methods: {
    setupMap: function() {
      // and the name to be displayed on the map type control.
      var styledMapType = new google.maps.StyledMapType(
        [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f5f5"
              }
            ]
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#f5f5f5"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#000000"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#bdbdbd"
              }
            ]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels",
            stylers: [
              {
                color: "#656565"
              }
            ]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#484848"
              }
            ]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#dedede"
              }
            ]
          },
          {
            featureType: "administrative.neighborhood",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#000000"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            stylers: [
              {
                color: "#35415b"
              }
            ]
          },
          {
            featureType: "landscape.natural.terrain",
            elementType: "labels",
            stylers: [
              {
                saturation: 10
              },
              {
                weight: 3.5
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#eeeeee"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [
              {
                color: "#000000"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#565656"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#e5e5e5"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#2f2f2f"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#dadada"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                color: "#e5e5e5"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#254f80"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#eeeeee"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#c9c9c9"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#c8c8c8"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          }
        ],
        { name: "Styled Map" }
      );

      console.log(
        "this event is....",
        this.event,
        this.event.venue,
        this.event.venue.address_1
      );
      var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.8781, lng: -87.6298 },
        zoom: 12,
        mapTypeControlOptions: {
          mapTypeIds: [
            "roadmap",
            "satellite",
            "hybrid",
            "terrain",
            "styled_map"
          ]
        }
      });
      map.mapTypes.set("styled_map", styledMapType);
      map.setMapTypeId("styled_map");
      console.log("Here's the map:", map);

      var location = {
        lat: this.event.venue.lat,
        lng: this.event.venue.lon
      };
      console.log(location);

      var contentString = this.event.venue.address_1;
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        title: "Location"
      });
      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });
    }
  },
  computed: {},
  filters: {
    shortDescription: function(text) {
      var maxLength = 100;
      if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
      } else {
        return text;
      }
    }
  }
};

var ExtensionAttendedEventsPage = {
  template: "#extension-attended-events-page",
  data: function() {
    return {
      extension_attended_events: []
      // selected_extension_attended_event: {},
      // tidbit: ""
    };
  },
  created: function() {
    axios.get("/v1/extension_attended_events").then(
      function(response) {
        this.extension_attended_events = response.data;
        console.log(this.extension_attended_events);
      }.bind(this)
    );
  },
  mounted: function() {
    // runThemeJavaScript();
    // initTheme();
  },
  methods: {
    // submitTidbit: function() {
    //   console.log(
    //     "submitTidbit",
    //     this.selected_extension_attended_event.name,
    //     this.tidbit
    //   );
    //   var params = {
    //     extension_attended_event_id: this.selected_extension_attended_event.id,
    //     tidbit: this.tidbit
    //   };
    //   axios.post("/v1/event_tidbits", params).then(
    //     function(response) {
    //       console.log(response.data);
    //       this.selected_extension_attended_event.tidbits.push(response.data);
    //       this.tidbit = "";
    //     }.bind(this)
    //   );
    // }
  },
  computed: {},
  filters: {
    shortDescription: function(text) {
      var maxLength = 100;
      if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
      } else {
        return text;
      }
    }
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/v1/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/attended_events", component: AttendedeventsPage },
    { path: "/events/:id", component: EventInfoPage },
    {
      path: "/extension_attended_events",
      component: ExtensionAttendedEventsPage
    }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});
