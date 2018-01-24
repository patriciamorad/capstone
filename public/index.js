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
    axios.get("/v1/events?count=9").then(
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
      axios.get("/v1/events?count=25").then(
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
          { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#f5f1e6" }]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{ color: "#c9b2a6" }]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "geometry.stroke",
            stylers: [{ color: "#dcd2be" }]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ae9e90" }]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [{ color: "#dfd2ae" }]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#dfd2ae" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#93817c" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#a5b076" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#447530" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#f5f1e6" }]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#fdfcf8" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#f8c967" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#e9bc62" }]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [{ color: "#e98d58" }]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [{ color: "#db8555" }]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [{ color: "#806b63" }]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{ color: "#dfd2ae" }]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.fill",
            stylers: [{ color: "#8f7d77" }]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ebe3cd" }]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [{ color: "#dfd2ae" }]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#b9d3c2" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#92998d" }]
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
    { path: "/events/:id", component: EventInfoPage }
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
