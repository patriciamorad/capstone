/* global Vue, VueRouter, axios, Elevator, jQuery, initTheme */
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
    axios.get("/v1/events?count=6").then(
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
      console.log("IM GONNA LOAD MOAR");
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
      axios.post("/v1/event_tidbits", params).then(function(response) {
        console.log(response.data);
      });
      // var params = {
      //   attended_event_id: ,
      //   input_tidbit: this.tidbit

      // };
      // axios
      //   .post("/v1/event_tidbits", params)
      //     .then(function(response) {
      //       router.push("/login");
      //     })
      //     .catch(
      //       function(error) {
      //         this.errors = [error.response.data.errors];
      //       }.bind(this)
      //     );
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
  created: function() {
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
        }.bind(this)
      );
  },
  mounted: function() {
    // runThemeJavaScript();
  },
  methods: {},
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
