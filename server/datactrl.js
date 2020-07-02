const e = require("express");

module.exports = {
  hitApi: (req, res) => {
    if (req.session.hitApi) {
      req.session.hitApi++;
      res.send("test");
    } else {
      req.session.hitApi = 1;
      res.send("first hit");
    }
  },

  getSession: (req, res) => {
    if (req.session) {
      res.status(200).send({
        data: {
          failedLoginEvents: req.session.failedLoginEvents,
          dayBeforeLastEvents: req.session.dayBeforeLastEvents,
          weekAgoEvents: req.session.weekAgoEvents,
          user: req.session.user,
          user2: req.session.user2,
          user3: req.session.user3,
        },
      });
    }
  },

  register: (req, res) => {
    req.session.hitApi++;
    const { email, password, phone } = req.body;
    if (!req.session.failedLoginEvents) {
      req.session.failedLoginEvents = 0;
    }
    if (!req.session.dayBeforeLastEvents) {
      req.session.dayBeforeLastEvents = [];
    }
    if (!req.session.weekAgoEvents) {
      req.session.weekAgoEvents = [];
    }

    if (req.session.user) {
      const username = req.session.user.email;
      if (email === username) {
        return res.status(200).send({ message: "Email already in use" });
      } else if (req.session.userLimit <= 2) {
        const user = { email: email, password: password, phone: phone };
        const newUser = user;
        if (email && password && phone) {
          req.session.user = newUser;
          req.session.userLimit++;
          res
            .status(201)
            .send({ message: "Success", session: req.session, loggedIn: true });
        } else {
          res.send(
            "Please make sure you have an email, password, and phone number"
          );
        }
      } else if (req.session.userLimit <= 3) {
        const user = { email: email, password: password, phone: phone };
        const newUser = user;
        if (email && password && phone) {
          req.session.user3 = newUser;
          req.session.userLimit++;
          res
            .status(201)
            .send({ message: "Success", session: req.session, loggedIn: true });
        } else {
          res.send(
            "Please make sure you have an email, password, and phone number"
          );
        }
      } else {
        res.send("max users reached");
      }
    } else {
      console.log(phone);
      if (email && password && phone) {
        const user = { email: email, password: password, phone: phone };
        const newUser = user;
        req.session.user = newUser;
        req.session.userLimit = 1;
        req.session.userLimit++;
        res
          .status(201)
          .send({ message: "Success", session: req.session, loggedIn: true });
      } else {
        res.send(
          "Please make sure you have an email, password, and phone number"
        );
      }
    }
  },

  login: (req, res) => {
    req.session.hitApi++;
    const { email, password } = req.body;

    if (req.session.user && req.session.user.email === email) {
      if (!req.session.user.allLoginEvents) {
        req.session.user.allLoginEvents = 0;
      }
      req.session.user.allLoginEvents++;
      const username = req.session.user.email;
      const userPass = req.session.user.password;

      if ((username === email) & (password === userPass)) {
        const eventCreation = new Date();
        const event = {
          id: req.session.hitApi,
          created: eventCreation,
          type: "LOGIN",
          failed: false,
        };
        if (req.session.user.events) {
          req.session.user.events.push(event);
        } else {
          req.session.user.events = [event];
        }
        for (let i = 0; i < req.session.user.events.length; i++) {
          req.session.user.allLoginEvents = req.session.user.events.length;
          let weekAgo = eventCreation - 7;
          let dayBeforeLast = eventCreation - 2;
          if (req.session.user.events[i].created < dayBeforeLast) {
            req.session.dayBeforeLastEvents.push(req.session.user.events[i]);
          }
          if (req.session.user.events[i].created < weekAgo) {
            req.session.weekAgoEvents.push(req.session.user.events[i]);
          }
          const dayBeforeLastFilteredEvents = req.session.dayBeforeLastEvents.reduce(
            (acc, current) => {
              const x = acc.find((item) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );
          const weekAgoFilteredEvents = req.session.weekAgoEvents.reduce(
            (acc, current) => {
              const x = acc.find((item) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );
          req.session.dayBeforeLastEvents = dayBeforeLastFilteredEvents;
          req.session.weekAgoEvents = weekAgoFilteredEvents;
        }

        return res.status(200).send({
          data: req.session,
        });
      } else {
        req.session.failedLoginEvents++;
        const eventCreation = new Date();
        const event = {
          created: eventCreation,
          type: "LOGIN",
          failed: true,
        };
        if (req.session.user.events) {
          req.session.user.events.push(event);
        } else {
          req.session.user.events = [event];
        }
        res.send({ message: "Login Failed" });
      }
    }

    if (req.session.user2 && req.session.user2.email === email) {
      if (!req.session.user2.allLoginEvents) {
        req.session.user2.allLoginEvents = 0;
      }
      req.session.user2.allLoginEvents++;
      const username = req.session.user2.email;
      const userPass = req.session.user2.password;

      if ((username === email) & (password === userPass)) {
        const eventCreation = new Date();
        const event = {
          id: req.session.hitApi,
          created: eventCreation,
          type: "LOGIN",
          failed: false,
        };
        if (req.session.user2.events) {
          req.session.user2.events.push(event);
        } else {
          req.session.user2.events = [event];
        }
        for (let i = 0; i < req.session.user2.events.length; i++) {
          req.session.user2.allLoginEvents = req.session.user2.events.length;
          let weekAgo = eventCreation - 7;
          let dayBeforeLast = eventCreation - 2;
          if (req.session.user2.events[i].created < dayBeforeLast) {
            req.session.dayBeforeLastEvents.push(req.session.user2.events[i]);
          }
          if (req.session.user2.events[i].created < weekAgo) {
            req.session.weekAgoEvents.push(req.session.user2.events[i]);
          }
          const dayBeforeLastFilteredEvents = req.session.dayBeforeLastEvents.reduce(
            (acc, current) => {
              const x = acc.find((item) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );
          const weekAgoFilteredEvents = req.session.weekAgoEvents.reduce(
            (acc, current) => {
              const x = acc.find((item) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );
          req.session.dayBeforeLastEvents = dayBeforeLastFilteredEvents;
          req.session.weekAgoEvents = weekAgoFilteredEvents;
        }

        return res.status(200).send({
          data: req.session,
        });
      } else {
        req.session.failedLoginEvents++;
        const eventCreation = new Date();
        const event = {
          created: eventCreation,
          type: "LOGIN",
          failed: true,
        };
        if (req.session.user2.events) {
          req.session.user2.events.push(event);
        } else {
          req.session.user2.events = [event];
        }
        res.send({ message: "Login Failed" });
      }
    }

    if (req.session.user3 && req.session.user3.email === email) {
      if (!req.session.user3.allLoginEvents) {
        req.session.user3.allLoginEvents = 0;
      }
      req.session.user3.allLoginEvents++;
      const username = req.session.user3.email;
      const userPass = req.session.user3.password;

      if ((username === email) & (password === userPass)) {
        const eventCreation = new Date();
        const event = {
          id: req.session.hitApi,
          created: eventCreation,
          type: "LOGIN",
          failed: false,
        };
        if (req.session.user3.events) {
          req.session.user3.events.push(event);
        } else {
          req.session.user3.events = [event];
        }
        for (let i = 0; i < req.session.user3.events.length; i++) {
          req.session.user3.allLoginEvents = req.session.user3.events.length;
          let weekAgo = eventCreation - 7;
          let dayBeforeLast = eventCreation - 2;
          if (req.session.user3.events[i].created < dayBeforeLast) {
            req.session.dayBeforeLastEvents.push(req.session.user3.events[i]);
          }
          if (req.session.user3.events[i].created < weekAgo) {
            req.session.weekAgoEvents.push(req.session.user3.events[i]);
          }
          const dayBeforeLastFilteredEvents = req.session.dayBeforeLastEvents.reduce(
            (acc, current) => {
              const x = acc.find((item) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );
          const weekAgoFilteredEvents = req.session.weekAgoEvents.reduce(
            (acc, current) => {
              const x = acc.find((item) => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            },
            []
          );
          req.session.dayBeforeLastEvents = dayBeforeLastFilteredEvents;
          req.session.weekAgoEvents = weekAgoFilteredEvents;
        }

        return res.status(200).send({
          data: req.session,
        });
      } else {
        req.session.failedLoginEvents++;
        const eventCreation = new Date();
        const event = {
          created: eventCreation,
          type: "LOGIN",
          failed: true,
        };
        if (req.session.user3.events) {
          req.session.user3.events.push(event);
        } else {
          req.session.user3.events = [event];
        }
        res.send({ message: "Login Failed" });
      }
    }
  },
};
