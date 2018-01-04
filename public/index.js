/* global Vue, VueRouter, axios, Elevator */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      events: []
    };
  },
  mounted: function() {
    axios.get("/v1/events").then(
      function(response) {
        this.events = response.data;
        console.log(this.events);
      }.bind(this)
    );
    window.onload = function() {
      var elevator = new Elevator({
        element: document.querySelector(".elevator-button"),
        mainAudio: "/src/to/audio.mp3",
        endAudio: "/src/to/end-audio.mp3"
      });
    };
  },
  methods: {
    saveEvent: function() {
      var params = {
        input_name: this.name,
        input_price: this.price,
        input_description: this.description
      };
      axios
        .post("/v1/products/:id", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = [error.response.data.errors];
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
    { path: "/logout", component: LogoutPage }
  ]
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
