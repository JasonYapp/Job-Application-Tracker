import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link, useLocation, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect, useMemo } from "react";
import { Users, Brain, MessageCircle, Code, UserCheck, CheckCircle, X, Plus } from "lucide-react";
import { useDraggable, useDroppable, useSensors, useSensor, PointerSensor, DndContext, DragOverlay } from "@dnd-kit/core";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Navbar = () => {
  return /* @__PURE__ */ jsxs("nav", { className: "nav", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "MissionEmployment", children: "Mission Employment" }),
    /* @__PURE__ */ jsxs("ul", { className: "nav-center", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "navLink", to: "/features", children: "Features" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "navLink", to: "/about", children: "About" }) })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "nav-right", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "navLink", to: "/login", children: "Log In" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "navLink", to: "/signup", children: "Sign Up For Free" }) })
    ] })
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "footer", children: /* @__PURE__ */ jsxs("div", { className: "columns", children: [
    /* @__PURE__ */ jsxs("div", { className: "mission-column", children: [
      /* @__PURE__ */ jsx("div", { className: "mission-title", children: " Mission Employment " }),
      /* @__PURE__ */ jsx("div", { className: "mission-text", children: " Connecting talented individuals with meaningful career opportunities." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "column-section", children: [
      /* @__PURE__ */ jsx("h3", { children: " Company" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: " About Us " }),
        /* @__PURE__ */ jsx("li", { children: " Privacy Policy " }),
        /* @__PURE__ */ jsx("li", { children: " Terms Of Service " })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "column-section", children: [
      /* @__PURE__ */ jsx("h3", { children: " Product" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: " Log In" }),
        /* @__PURE__ */ jsx("li", { children: " Features " })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "column-section", children: [
      /* @__PURE__ */ jsx("h3", { children: " Help " }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: " FAQS " }),
        /* @__PURE__ */ jsx("li", { children: " Get Started " }),
        /* @__PURE__ */ jsx("li", { children: " Contact Us " })
      ] })
    ] })
  ] }) });
};
const _layout$1 = withComponentProps(function Layout2() {
  const location = useLocation();
  const pagesWithFooter = ["/", "/about", "/features"];
  const showFooter = pagesWithFooter.includes(location.pathname);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), showFooter && /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _layout$1
}, Symbol.toStringTag, { value: "Module" }));
const KanBanView = "/assets/KanBanView-N3mbvLmG.PNG";
const UpcomingTasks$1 = "/assets/UpcomingTasks-BIalQxnr.png";
const Home = () => {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "landing-container",
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element"
      }), /* @__PURE__ */ jsxs("div", {
        className: "box-container",
        children: [/* @__PURE__ */ jsxs("section", {
          className: "first-box",
          children: [/* @__PURE__ */ jsx("header", {
            children: " From application to offer - every step in one place."
          }), /* @__PURE__ */ jsx("div", {
            className: "tagline",
            children: /* @__PURE__ */ jsx("p", {
              children: "With details and reminders on interviews, deadlines and those pesky questionnaires, Mission Employment is job tracking made simple."
            })
          }), /* @__PURE__ */ jsx(Link, {
            to: "/signup",
            className: "sign-up",
            children: /* @__PURE__ */ jsx("button", {
              children: "Start Your Journey"
            })
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "second-box",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "second-box-content",
            children: [/* @__PURE__ */ jsxs("h3", {
              children: ["Stay Organized, ", /* @__PURE__ */ jsx("br", {}), "Stay Ahead "]
            }), /* @__PURE__ */ jsx("p", {
              children: 'A tool to keep you organized throughout your job search journey. Manage interview schedules, and monitor your progress all in one place. Stay on top of deadlines and never miss an important follow-up again."'
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "second-box-task",
            children: /* @__PURE__ */ jsx("img", {
              src: UpcomingTasks$1,
              alt: "Task Image"
            })
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "third-box",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "third-box-content",
            children: [/* @__PURE__ */ jsx("h3", {
              children: "Visual Progress Tracking"
            }), /* @__PURE__ */ jsx("p", {
              children: "See your entire job search journey at a glance with our intuitive Kanban-style board. Track applications from submission to offer, with clear visual indicators of your progress at each stage."
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "third-box-kanban",
            children: /* @__PURE__ */ jsx("img", {
              src: KanBanView,
              alt: "Kanban Board"
            })
          })]
        })]
      })]
    })
  });
};
const _index = withComponentProps(Home);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index
}, Symbol.toStringTag, { value: "Module" }));
const DragDropView = "/assets/DragDropView-DuAgrcZ6.png";
const BarStatsView = "/assets/BarStatsView-CLaookc2.PNG";
const Features = () => {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "features-landing-container",
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsxs("div", {
        className: "box-container",
        children: [/* @__PURE__ */ jsxs("section", {
          className: "first-box",
          children: [/* @__PURE__ */ jsx("h1", {
            children: " The ultimate organization tool for job applications "
          }), /* @__PURE__ */ jsx("p", {
            children: "Everything you need to manage your job search in one powerful, intuitive platform."
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "second-box",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "second-box-content",
            children: [/* @__PURE__ */ jsx("h3", {
              children: "Complete Application Management "
            }), /* @__PURE__ */ jsx("p", {
              children: "Track every application from submission to offer. With an easy drag and drop kanban style tracker, never lose track of where you applied or what stage you're at."
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "second-box-task",
            children: /* @__PURE__ */ jsx("img", {
              src: DragDropView,
              alt: "Application Image"
            })
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "third-box",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "third-box-content",
            children: [/* @__PURE__ */ jsx("h3", {
              children: "Visual Progress Tracking"
            }), /* @__PURE__ */ jsx("p", {
              children: "See your entire job search journey at a glance with our intuitive Kanban-style board. Track applications from submission to offer, with clear visual indicators of your progress at each stage."
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "third-box-kanban",
            children: /* @__PURE__ */ jsx("img", {
              src: KanBanView,
              alt: "Kanban Board"
            })
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "fourth-box",
          children: [/* @__PURE__ */ jsx("div", {
            className: "fourth-box-task",
            children: /* @__PURE__ */ jsx("img", {
              src: BarStatsView,
              alt: "Bar Image"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "fourth-box-content",
            children: [/* @__PURE__ */ jsx("h3", {
              children: "Know Your Success Pipeline "
            }), /* @__PURE__ */ jsx("p", {
              children: "Track your conversion rates from application to offer. See what's working and where you're losing momentum, so you can optimize your approach and land that perfect role faster."
            })]
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "second-box",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "second-box-content",
            children: [/* @__PURE__ */ jsxs("h3", {
              children: [" Stay Sharp, ", /* @__PURE__ */ jsx("br", {}), " Stay Scheduled "]
            }), /* @__PURE__ */ jsx("p", {
              children: " From interview prep reminders to follow-up deadlines, keep everything organized and ensure you're always one step ahead."
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "second-box-task",
            children: /* @__PURE__ */ jsx("img", {
              src: UpcomingTasks$1,
              alt: "Task Image"
            })
          })]
        })]
      })]
    })
  });
};
const features = withComponentProps(Features);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: features
}, Symbol.toStringTag, { value: "Module" }));
const About = () => {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "features-landing-container",
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element"
      }), /* @__PURE__ */ jsxs("div", {
        className: "box-container",
        children: [/* @__PURE__ */ jsxs("section", {
          className: "first-box",
          children: [/* @__PURE__ */ jsx("h1", {
            children: " Built by Someone Who's Been There "
          }), /* @__PURE__ */ jsx("p", {
            children: "The modern job application process is broken. As someone who navigated the demanding world of tech hiring, I experienced firsthand how overwhelming it can become. That's why I built Mission Employment - to bring sanity back to job searching."
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "story-box",
          children: [/* @__PURE__ */ jsx("h3", {
            children: " The Hidden Complexity of Modern Hiring "
          }), /* @__PURE__ */ jsx("p", {
            children: "What many don't realize is that applying for jobs has become a full-time endeavor. In software engineering, a single application can involve 6-8 distinct stages: resume screening, cognitive assessments, digital interviews, coding challenges, assessment centers, panel interviews, and final rounds."
          }), /* @__PURE__ */ jsx("p", {
            children: "Each stage comes with aggressive timelines - typically 48-72 hours. Cognitive tests can consume 2 hours. Coding assessments demand another 2 hours. Digital interviews add more complexity. Apply to multiple companies simultaneously, and you're suddenly managing a maze of overlapping deadlines and requirements."
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "story-box",
          children: [/* @__PURE__ */ jsx("h3", {
            children: " When Process Becomes Chaos "
          }), /* @__PURE__ */ jsx("p", {
            children: "I found myself juggling cognitive tests due tomorrow, coding challenges due the next day, multiple digital interviews throughout the week - all while trying to remember which company required which specific assessment format. The mental overhead was staggering."
          }), /* @__PURE__ */ jsx("p", {
            children: "It wasn't just challenging - it was unsustainable."
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "story-box",
          children: [/* @__PURE__ */ jsx("h3", {
            children: " From Personal Pain Point to Purpose "
          }), /* @__PURE__ */ jsx("p", {
            children: " Mission Employment emerged from necessity. I needed to track every stage of every application, monitor live deadlines, and maintain organized records of each opportunity. What began as a personal solution became something I realized the entire job-seeking community needed."
          }), /* @__PURE__ */ jsx("p", {
            children: "Every feature addresses a real friction point I encountered during my own search. The Kanban boards, the deadline tracking, the progress analytics - all born from moments of frustration that I knew could be solved with better organization."
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "first-box",
          children: [/* @__PURE__ */ jsx("h3", {
            children: " Restoring Focus to What Matters "
          }), /* @__PURE__ */ jsx("p", {
            children: " When you're already focused on landing your ideal role, you shouldn't have to worry about losing track of applications or missing critical deadlines. Mission Employment handles the chaos so you can focus on what truly matters - showcasing your skills and finding the right opportunity."
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "sign-up-section",
          children: [/* @__PURE__ */ jsx("h3", {
            children: "Ready to Take Control?"
          }), /* @__PURE__ */ jsx("p", {
            children: "Join other job seekers who've transformed their search from chaos to clarity with Mission Employment."
          }), /* @__PURE__ */ jsx(Link, {
            to: "/signup",
            className: "sign-up-button",
            children: /* @__PURE__ */ jsx("button", {
              children: "Start Your Journey"
            })
          })]
        })]
      })]
    })
  });
};
const about = withComponentProps(About);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await response.json();
      console.log("Login response data:", data);
      console.log("Token from response:", data.token);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error2) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("section", {
      className: "login-background",
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        style: {
          paddingTop: "6rem"
        },
        children: /* @__PURE__ */ jsxs("div", {
          className: "loginContainer",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "header",
            children: "Login"
          }), /* @__PURE__ */ jsx("p", {
            className: "tagline",
            children: "Please enter your details to login to your account"
          }), /* @__PURE__ */ jsxs("form", {
            children: [/* @__PURE__ */ jsxs("div", {
              className: "form",
              children: [/* @__PURE__ */ jsx("input", {
                type: "email",
                name: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "Enter your email",
                disabled: loading
              }), /* @__PURE__ */ jsx("input", {
                type: "password",
                name: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Enter your password",
                disabled: loading
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "forgot-password",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/forgotpassword",
                className: "forgot-password-link",
                children: "Forgot your password?"
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "submitButton",
              children: /* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: handleSubmit,
                disabled: loading,
                children: "Log in"
              })
            })]
          })]
        })
      })]
    })
  });
};
const login = withComponentProps(Login);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          name,
          phone
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User created successfully:", data);
        navigate("/login");
      } else {
        setError(data.message || "Failed to create account");
      }
    } catch (error2) {
      console.error("Network error:", error2);
      setError("Network error. Please check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("section", {
      className: "signup-background",
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element3"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element3"
      }), /* @__PURE__ */ jsx("div", {
        style: {
          paddingTop: "4rem"
        },
        children: /* @__PURE__ */ jsxs("div", {
          className: "signUpContainer",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "header",
            children: "Sign Up"
          }), /* @__PURE__ */ jsx("p", {
            className: "tagline",
            children: "Please enter your details to sign up!"
          }), error && /* @__PURE__ */ jsx("div", {
            className: "error-message",
            children: error
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleSubmit,
            children: [/* @__PURE__ */ jsxs("div", {
              className: "form",
              children: [/* @__PURE__ */ jsx("input", {
                type: "name",
                name: "name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Enter your first name",
                required: true,
                disabled: loading
              }), /* @__PURE__ */ jsx("input", {
                type: "phone",
                name: "phone",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "Enter your phone number",
                required: true,
                disabled: loading
              }), /* @__PURE__ */ jsx("input", {
                type: "email",
                name: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "Enter your email",
                required: true,
                disabled: loading
              }), /* @__PURE__ */ jsx("input", {
                type: "password",
                name: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Enter your password",
                required: true,
                disabled: loading
              }), /* @__PURE__ */ jsx("input", {
                type: "password",
                name: "confirmPassword",
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                placeholder: "Re-enter your password",
                required: true,
                disabled: loading
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "submitButton",
              children: /* @__PURE__ */ jsx("button", {
                type: "submit",
                disabled: loading,
                children: loading ? "Creating Account..." : "Sign Up"
              })
            })]
          })]
        })
      })]
    })
  });
};
const signup = withComponentProps(SignUp);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signup
}, Symbol.toStringTag, { value: "Module" }));
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await response.json();
      console.log("Login response data:", data);
      console.log("Token from response:", data.token);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error2) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("section", {
      className: "login-background",
      children: [/* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        className: "pulse-element2"
      }), /* @__PURE__ */ jsx("div", {
        style: {
          paddingTop: "6rem"
        },
        children: /* @__PURE__ */ jsxs("div", {
          className: "forgotpwContainer",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "header",
            children: "Reset Your Password"
          }), /* @__PURE__ */ jsx("p", {
            className: "tagline",
            children: "Your password will be reset if the account exists"
          }), /* @__PURE__ */ jsxs("form", {
            children: [/* @__PURE__ */ jsxs("div", {
              className: "forgotpwform",
              children: [/* @__PURE__ */ jsx("input", {
                type: "email",
                name: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "Enter your email",
                disabled: loading
              }), /* @__PURE__ */ jsx("input", {
                type: "password",
                name: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Enter your new password",
                disabled: loading
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "submitButton",
              children: /* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: handleSubmit,
                disabled: loading,
                children: "Log in"
              })
            })]
          })]
        })
      })]
    })
  });
};
const forgotpassword = withComponentProps(ForgotPassword);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: forgotpassword
}, Symbol.toStringTag, { value: "Module" }));
const DashNav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return /* @__PURE__ */ jsxs("nav", { className: "nav", children: [
    /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "MissionEmployment", children: "Mission Employment" }),
    /* @__PURE__ */ jsxs("ul", { className: "nav-center", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "navLink", to: "/dashboard", children: "Dashboard" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "navLink", to: "/progressLine", children: "Job Progress Line" }) })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "nav-right", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "logout",
        onClick: handleLogout,
        children: "Log Out"
      }
    ) }) })
  ] });
};
const _layout = withComponentProps(function loggedInLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) {
      navigate("/login");
      return;
    }
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);
  if (!user) {
    return /* @__PURE__ */ jsx("div", {
      children: "Loading..."
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(DashNav, {}), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _layout
}, Symbol.toStringTag, { value: "Module" }));
const DashFunnel = ({ applications }) => {
  console.log("DashFunnel received applications:", applications);
  const rejectedApps = applications.filter((app) => app.status.toLowerCase() === "rejected");
  console.log("Rejected apps in funnel:", rejectedApps);
  rejectedApps.forEach((app) => {
    console.log(`App ${app.company_name}: previous_status = ${app.previous_status}`);
  });
  const [funnelData, setFunnelData] = useState([]);
  const stages = [
    {
      key: "applied",
      name: "Applied",
      icon: Users,
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      key: "cognitive testing",
      name: "Cognitive Tests",
      icon: Brain,
      color: "bg-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      key: "interview",
      name: "Digital Interview",
      icon: MessageCircle,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      key: "code exam",
      name: "Code Exam",
      icon: Code,
      color: "bg-cyan-500",
      bgColor: "bg-cyan-50"
    },
    {
      key: "physical interview",
      name: "Physical Interview",
      icon: UserCheck,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50"
    },
    {
      key: "offer",
      name: "Offer",
      icon: CheckCircle,
      color: "bg-green-500",
      bgColor: "bg-green-50"
    }
  ];
  useEffect(() => {
    if (applications && applications.length > 0) {
      calculateFunnelData();
    }
  }, [applications]);
  const calculateFunnelData = () => {
    const totalApplications = applications.length;
    if (totalApplications === 0) {
      setFunnelData([]);
      return;
    }
    let appliedCount = 0;
    let cognitiveCount = 0;
    let digitalInterviewCount = 0;
    let codeExamCount = 0;
    let physicalInterviewCount = 0;
    let offerCount = 0;
    let currentApplied = 0;
    let currentCognitive = 0;
    let currentDigitalInterview = 0;
    let currentCodeExam = 0;
    let currentPhysicalInterview = 0;
    let currentOffer = 0;
    let rejectedFromApplied = 0;
    let rejectedFromCognitive = 0;
    let rejectedFromDigitalInterview = 0;
    let rejectedFromCodeExam = 0;
    let rejectedFromPhysicalInterview = 0;
    let rejectedFromOffer = 0;
    function processRejectedApplication(app) {
      var _a;
      const previousStatus = ((_a = app.previous_status) == null ? void 0 : _a.toLowerCase()) || "applied";
      console.log("Rejected app:", app.company_name, "previous_status:", app.previous_status, "normalized:", previousStatus);
      appliedCount++;
      switch (previousStatus) {
        case "applied":
          rejectedFromApplied++;
          break;
        case "cognitivetesting":
          cognitiveCount++;
          rejectedFromCognitive++;
          break;
        case "digitalinterview":
          cognitiveCount++;
          digitalInterviewCount++;
          rejectedFromDigitalInterview++;
          break;
        case "codeexam":
          cognitiveCount++;
          digitalInterviewCount++;
          codeExamCount++;
          rejectedFromCodeExam++;
          break;
        case "interview":
          cognitiveCount++;
          digitalInterviewCount++;
          codeExamCount++;
          physicalInterviewCount++;
          rejectedFromPhysicalInterview++;
          break;
        case "offer":
          cognitiveCount++;
          digitalInterviewCount++;
          codeExamCount++;
          physicalInterviewCount++;
          offerCount++;
          rejectedFromOffer++;
          break;
      }
    }
    function processActiveApplication(app, status) {
      console.log("Processing status:", status);
      appliedCount++;
      switch (status) {
        case "applied":
          currentApplied++;
          break;
        case "cognitivetesting":
          cognitiveCount++;
          currentCognitive++;
          break;
        case "digitalinterview":
          cognitiveCount++;
          digitalInterviewCount++;
          currentDigitalInterview++;
          break;
        case "codeexam":
          cognitiveCount++;
          digitalInterviewCount++;
          codeExamCount++;
          currentCodeExam++;
          break;
        case "interview":
          cognitiveCount++;
          digitalInterviewCount++;
          codeExamCount++;
          physicalInterviewCount++;
          currentPhysicalInterview++;
          break;
        case "offer":
          cognitiveCount++;
          digitalInterviewCount++;
          codeExamCount++;
          physicalInterviewCount++;
          offerCount++;
          currentOffer++;
          break;
        default:
          currentApplied++;
          break;
      }
    }
    function buildFunnelArray() {
      const totalCounts = [
        appliedCount,
        cognitiveCount,
        digitalInterviewCount,
        codeExamCount,
        physicalInterviewCount,
        offerCount
      ];
      const currentCounts = [
        currentApplied,
        currentCognitive,
        currentDigitalInterview,
        currentCodeExam,
        currentPhysicalInterview,
        currentOffer
      ];
      const rejectedCounts = [
        rejectedFromApplied,
        rejectedFromCognitive,
        rejectedFromDigitalInterview,
        rejectedFromCodeExam,
        rejectedFromPhysicalInterview,
        rejectedFromOffer
      ];
      return stages.map((stage, index) => {
        const totalReached = totalCounts[index];
        const currentCount = currentCounts[index];
        const rejectedCount = rejectedCounts[index];
        const percentage = totalApplications > 0 ? totalReached / totalApplications * 100 : 0;
        let conversionFromPrevious = 100;
        if (index > 0) {
          const previousTotal = totalCounts[index - 1];
          conversionFromPrevious = previousTotal > 0 ? totalReached / previousTotal * 100 : 0;
        }
        const rejectionRate = totalReached > 0 ? rejectedCount / totalReached * 100 : 0;
        return {
          ...stage,
          count: currentCount,
          rejectedCount,
          totalReached,
          percentage: Math.round(percentage * 10) / 10,
          conversionFromPrevious: Math.round(conversionFromPrevious * 10) / 10,
          rejectionRate: Math.round(rejectionRate * 10) / 10
        };
      });
    }
    applications.forEach((app) => {
      const status = app.status.toLowerCase();
      console.log("Decider for function to use:", status);
      if (status === "rejected") {
        processRejectedApplication(app);
      } else {
        processActiveApplication(app, status);
      }
    });
    console.log("Debug counts:", {
      appliedCount,
      cognitiveCount,
      currentCognitive,
      currentApplied,
      applications: applications.map((app) => ({
        status: app.status,
        previous_status: app.previous_status
      }))
    });
    const funnel = buildFunnelArray();
    setFunnelData(funnel);
  };
  const getBarWidth = (percentage) => {
    return `${Math.max(percentage, 2)}%`;
  };
  if (!funnelData.length) {
    return /* @__PURE__ */ jsx("div", { className: "funnel-no-data", children: "No application data to display" });
  }
  return /* @__PURE__ */ jsx("div", { className: "funnel-container", children: /* @__PURE__ */ jsx("div", { className: "funnel-stages", children: funnelData.map((stage, index) => {
    const Icon = stage.icon;
    const isFirst = index === 0;
    const isLast = index === funnelData.length - 1;
    const movedPast = !isLast && index < funnelData.length - 1 ? funnelData[index + 1].totalReached : 0;
    return /* @__PURE__ */ jsxs("div", { className: "funnel-stage-wrapper", children: [
      /* @__PURE__ */ jsxs("div", { className: `funnel-stage funnel-stage-${stage.key.replace(/\s+/g, "-")}`, children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `funnel-progress funnel-progress-${stage.key.replace(/\s+/g, "-")}`,
            style: { width: getBarWidth(stage.percentage) }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "funnel-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "funnel-left", children: [
            /* @__PURE__ */ jsx("div", { className: `funnel-icon funnel-icon-${stage.key.replace(/\s+/g, "-")}`, children: /* @__PURE__ */ jsx(Icon, { size: 16 }) }),
            /* @__PURE__ */ jsxs("div", { className: "funnel-details", children: [
              /* @__PURE__ */ jsx("h4", { className: "funnel-stage-name", children: stage.name }),
              /* @__PURE__ */ jsxs("div", { className: "funnel-metrics", children: [
                stage.count > 0 && /* @__PURE__ */ jsxs("span", { className: "funnel-current", children: [
                  stage.count,
                  " currently here"
                ] }),
                !isLast && movedPast > 0 && /* @__PURE__ */ jsxs("span", { className: "funnel-passed", children: [
                  movedPast,
                  " advanced"
                ] }),
                stage.rejectedCount > 0 && /* @__PURE__ */ jsxs("span", { className: "funnel-rejected", children: [
                  stage.rejectedCount,
                  " rejected"
                ] }),
                !isFirst && /* @__PURE__ */ jsxs("span", { className: "funnel-conversion", children: [
                  stage.conversionFromPrevious,
                  "% conversion rate from previous stage"
                ] }),
                stage.rejectedCount > 0 && stage.totalReached > 0 && /* @__PURE__ */ jsxs("span", { className: "funnel-rejection", children: [
                  Math.round(stage.rejectedCount / stage.totalReached * 100),
                  "% rejected here"
                ] }),
                isLast && stage.totalReached > 0 && /* @__PURE__ */ jsxs("span", { className: "funnel-completion", children: [
                  "Success rate: ",
                  stage.percentage,
                  "%"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "funnel-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "funnel-percentage", children: [
              stage.percentage,
              "%"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "funnel-total", children: [
              stage.totalReached,
              " total reached"
            ] })
          ] })
        ] })
      ] }),
      index < funnelData.length - 1 && /* @__PURE__ */ jsx("div", { className: "funnel-connector", children: /* @__PURE__ */ jsx("div", { className: "funnel-connector-dot", children: /* @__PURE__ */ jsx("div", { className: "funnel-connector-inner" }) }) })
    ] }, stage.key);
  }) }) });
};
const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/ApplicationData", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error2) {
      console.error("Error fetching applications:", error2);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);
  const totalApplications = applications.length;
  const totalInterviews = applications.filter((app) => app.status.toLowerCase() === "interview").length;
  const totalOffers = applications.filter((app) => app.status.toLowerCase() === "offer").length;
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "background-container loading-container",
      children: /* @__PURE__ */ jsxs("div", {
        className: "loading-content",
        children: [/* @__PURE__ */ jsx("div", {
          className: "loading-spinner"
        }), /* @__PURE__ */ jsx("p", {
          children: "Loading your dashboard..."
        })]
      })
    });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", {
      className: "background-container error-container",
      children: /* @__PURE__ */ jsxs("div", {
        className: "error-content",
        children: [/* @__PURE__ */ jsx(X, {
          size: 48,
          className: "error-icon"
        }), /* @__PURE__ */ jsx("p", {
          className: "error-message",
          children: error
        }), /* @__PURE__ */ jsx("button", {
          onClick: fetchApplications,
          className: "retry-button",
          children: "Retry"
        })]
      })
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className: "background-container",
    children: /* @__PURE__ */ jsxs("div", {
      className: "dashboard-grid",
      children: [/* @__PURE__ */ jsx("section", {
        className: "dashboard-title",
        children: /* @__PURE__ */ jsx("h1", {
          children: "Hey there, welcome to your dashboard!"
        })
      }), /* @__PURE__ */ jsx("section", {
        className: "stats-section",
        children: /* @__PURE__ */ jsxs("div", {
          className: "stats-container",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "stats-box",
            children: [/* @__PURE__ */ jsx("h3", {
              children: "Total Applications"
            }), /* @__PURE__ */ jsx("p", {
              className: "totalApplications",
              children: totalApplications
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "stats-box",
            children: [/* @__PURE__ */ jsx("h3", {
              children: "Total Interviews"
            }), /* @__PURE__ */ jsx("p", {
              className: "totalApplications",
              children: totalInterviews
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "stats-box",
            children: [/* @__PURE__ */ jsx("h3", {
              children: "Total Offers"
            }), /* @__PURE__ */ jsx("p", {
              className: "totalApplications",
              children: totalOffers
            })]
          })]
        })
      }), /* @__PURE__ */ jsx("section", {
        className: "applications-section separate",
        children: /* @__PURE__ */ jsx("div", {
          className: "applications-container",
          children: /* @__PURE__ */ jsx(DashFunnel, {
            applications
          })
        })
      })]
    })
  });
};
const dashboard = withComponentProps(Dashboard);
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const Task = ({ application, onApplicationDeleted }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/DeleteApplication/${application.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.ok) {
        console.log("Deleted");
        onApplicationDeleted();
      } else {
        const data = await response.json();
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.id
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1
  } : void 0;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      ...listeners,
      ...attributes,
      className: `task ${isDragging ? "task-dragging" : ""}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "task-header", children: [
          /* @__PURE__ */ jsx("h3", { className: "task-title", children: application.job_title }),
          /* @__PURE__ */ jsx("div", { className: "task-drag-handle", children: "⋮⋮" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "task-company", children: /* @__PURE__ */ jsx("span", { className: "company-name", children: application.company_name }) }),
        application.salary_range && /* @__PURE__ */ jsxs("div", { className: "task-salary", children: [
          /* @__PURE__ */ jsx("span", { className: "salary-label", children: "Salary:" }),
          /* @__PURE__ */ jsx("span", { className: "salary-value", children: application.salary_range })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "task-dates", children: [
          /* @__PURE__ */ jsxs("div", { className: "task-date", children: [
            /* @__PURE__ */ jsx("span", { className: "date-label", children: "Applied:" }),
            /* @__PURE__ */ jsx("span", { className: "date-value", children: formatDate(application.created_at) })
          ] }),
          application.updated_at !== application.created_at && /* @__PURE__ */ jsxs("div", { className: "task-date", children: [
            /* @__PURE__ */ jsx("span", { className: "date-label", children: "Updated:" }),
            /* @__PURE__ */ jsx("span", { className: "date-value", children: formatDate(application.updated_at) })
          ] })
        ] }),
        application.notes && /* @__PURE__ */ jsxs("div", { className: "task-notes", children: [
          /* @__PURE__ */ jsx("span", { className: "notes-label", children: "Notes:" }),
          /* @__PURE__ */ jsx("p", { className: "notes-text", children: application.notes })
        ] }),
        application.job_url && /* @__PURE__ */ jsxs("div", { className: "task-url", children: [
          /* @__PURE__ */ jsx("a", { href: application.job_url, target: "_blank", rel: "noopener noreferrer", className: "job-link", children: "View Job Posting" }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "4px", marginTop: "4px" }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => navigate(`/editTask/${application.id}`),
                className: "edit-link",
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(),
                className: "delete-link",
                children: "Delete"
              }
            )
          ] })
        ] })
      ]
    }
  );
};
const Column = ({ title, applications, status, onApplicationDeleted }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status
  });
  const style = {
    backgroundColor: isOver ? "#f0f9ff" : void 0
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      className: `column ${isOver ? "column-over" : ""}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "column-header", children: [
          /* @__PURE__ */ jsx("h2", { className: "column-title", children: title }),
          /* @__PURE__ */ jsx("span", { className: "column-count", children: applications.length })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "column-content", children: [
          applications.map((application) => /* @__PURE__ */ jsx(
            Task,
            {
              application,
              onApplicationDeleted
            },
            application.id
          )),
          applications.length === 0 && /* @__PURE__ */ jsx("div", { className: "column-empty", children: /* @__PURE__ */ jsx("p", { children: "No applications" }) })
        ] })
      ]
    }
  );
};
const addApplication = ({ onSuccess }) => {
  const [showNewAppForm, setShowNewAppForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [workType, setWorkType] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [notes, setNotes] = useState("");
  const [progressionStatus, setProgressionStatus] = useState("");
  const addTask = () => {
    setShowNewAppForm(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          job_title: jobTitle,
          company_name: company,
          salary_range: salary,
          status: progressionStatus,
          job_url: jobLink,
          notes,
          previous_status: progressionStatus
        })
      });
      const data = await response.json();
      if (response.ok) {
        setShowNewAppForm(false);
        console.log("Application created successfully:", data);
        setJobTitle("");
        setCompany("");
        setSalary("");
        setWorkType("");
        setJobLink("");
        setNotes("");
        setProgressionStatus("");
      } else {
        setError(data.message || "Failed to create application");
      }
    } catch (error2) {
      console.error("Network error:", error2);
      setError("Network error. Please check if your backend is running.");
    } finally {
      setLoading(false);
      onSuccess();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { className: "addTask", onClick: addTask, children: " New Application " }),
    showNewAppForm && /* @__PURE__ */ jsx("div", { className: "popup-overlay", children: /* @__PURE__ */ jsxs("div", { className: "popup-content", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "close-button",
          onClick: () => setShowNewAppForm(false),
          type: "button",
          children: "×"
        }
      ),
      /* @__PURE__ */ jsx("h2", { children: "Add New Application" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "form", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "jobTitle",
              value: jobTitle,
              onChange: (e) => setJobTitle(e.target.value),
              placeholder: "Enter job title",
              required: true,
              disabled: loading
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "company",
              value: company,
              onChange: (e) => setCompany(e.target.value),
              placeholder: "Company Name",
              required: true,
              disabled: loading
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              name: "salary",
              value: salary,
              onChange: (e) => setSalary(e.target.value),
              placeholder: "Enter salary",
              required: true,
              disabled: loading,
              min: "0",
              step: "1000"
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              name: "workType",
              value: workType,
              onChange: (e) => setWorkType(e.target.value),
              required: true,
              disabled: loading,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select work type" }),
                /* @__PURE__ */ jsx("option", { value: "full-time", children: "Full Time" }),
                /* @__PURE__ */ jsx("option", { value: "part-time", children: "Part Time" }),
                /* @__PURE__ */ jsx("option", { value: "casual", children: "Casual" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "jobLink",
              value: jobLink,
              onChange: (e) => setJobLink(e.target.value),
              placeholder: "Job Link",
              required: true,
              disabled: loading
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "additional-notes",
              name: "notes",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Additional Notes",
              disabled: loading
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              name: "progressionStatus",
              value: progressionStatus,
              onChange: (e) => setProgressionStatus(e.target.value),
              required: true,
              disabled: loading,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select progression status" }),
                /* @__PURE__ */ jsx("option", { value: "Applied", children: "Applied" }),
                /* @__PURE__ */ jsx("option", { value: "CognitiveTesting", children: "Cognitive Test" }),
                /* @__PURE__ */ jsx("option", { value: "DigitalInterview", children: "Digital Interview" }),
                /* @__PURE__ */ jsx("option", { value: "CodeExam", children: "Code Exam" }),
                /* @__PURE__ */ jsx("option", { value: "Interview", children: "In-Person Interview" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "submitButton", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, children: loading ? "Adding Application..." : "Add Application" }) })
      ] })
    ] }) })
  ] });
};
const Board = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [activeApplication, setActiveApplication] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );
  useEffect(() => {
    fetchApplications();
  }, []);
  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/ApplicationData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data.applications);
    } catch (error2) {
      console.error("Error fetching applications:", error2);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };
  const groupedApplications = useMemo(() => {
    const groups = {
      "applied": [],
      "cognitivetesting": [],
      "digitalinterview": [],
      "codeexam": [],
      "interview": [],
      "offer": [],
      "rejected": []
    };
    applications.forEach((app) => {
      const status = app.status.toLowerCase();
      if (groups[status]) {
        groups[status].push(app);
      } else {
        groups.applied.push(app);
      }
    });
    return groups;
  }, [applications]);
  const columns = [
    { id: "Applied", title: "Applied", applications: groupedApplications.applied },
    { id: "CognitiveTesting", title: "Cognitive Testing", applications: groupedApplications.cognitivetesting },
    { id: "DigitalInterview", title: "Digital Interview", applications: groupedApplications.digitalinterview },
    { id: "CodeExam", title: "Code Exam", applications: groupedApplications.codeexam },
    { id: "Interview", title: "Interview", applications: groupedApplications.interview },
    { id: "Offer", title: "Offer", applications: groupedApplications.offer },
    { id: "Rejected", title: "Rejected", applications: groupedApplications.rejected }
  ];
  const handleDragStart = (event) => {
    const activeApp = applications.find((app) => app.id === event.active.id);
    setActiveId(event.active.id);
    setActiveApplication(activeApp || null);
  };
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveApplication(null);
    if (!over) {
      return;
    }
    const activeId2 = active.id;
    let newStatus = "";
    for (const column of columns) {
      if (column.applications.some((app) => app.id === over.id) || column.id === over.id) {
        newStatus = column.id;
        break;
      }
    }
    if (!newStatus) {
      return;
    }
    const applicationToMove = applications.find((app) => app.id === activeId2);
    if (!applicationToMove || applicationToMove.status.toLowerCase() === newStatus) {
      return;
    }
    setApplications(
      (prev) => prev.map(
        (app) => app.id === activeId2 ? { ...app, status: newStatus } : app
      )
    );
    try {
      const response = await fetch("http://localhost:5000/api/auth/ApplicationUpdateStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          id: activeId2,
          status: newStatus
        })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (error2) {
      console.error("Error fetching applications:", error2);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
    if (loading) {
      return /* @__PURE__ */ jsx("h2", { children: "Loading applications..." });
    }
    if (error) {
      return /* @__PURE__ */ jsxs("h2", { children: [
        "Error: ",
        error
      ] });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "board-container", children: [
    /* @__PURE__ */ jsx("div", { className: "board-header", children: /* @__PURE__ */ jsx(addApplication, { onSuccess: fetchApplications }) }),
    /* @__PURE__ */ jsx("h1", { className: "board-title", children: "Job Progress Line" }),
    /* @__PURE__ */ jsxs(
      DndContext,
      {
        sensors,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        children: [
          /* @__PURE__ */ jsx("div", { className: "columns-container", children: columns.map((column) => /* @__PURE__ */ jsx(
            Column,
            {
              title: column.title,
              applications: column.applications,
              status: column.id,
              onApplicationDeleted: fetchApplications
            },
            column.id
          )) }),
          /* @__PURE__ */ jsx(DragOverlay, { children: activeApplication ? /* @__PURE__ */ jsxs("div", { className: "drag-overlay", children: [
            /* @__PURE__ */ jsx("h3", { className: "drag-overlay-title", children: activeApplication.job_title }),
            /* @__PURE__ */ jsx("p", { className: "drag-overlay-company", children: activeApplication.company_name })
          ] }) : null })
        ]
      }
    )
  ] });
};
const ProgressLine = () => {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("div", {
      className: "progress-line-container",
      children: /* @__PURE__ */ jsx("div", {
        className: "progress-line-content",
        children: /* @__PURE__ */ jsx(Board, {})
      })
    })
  });
};
const progressLine = withComponentProps(ProgressLine);
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: progressLine
}, Symbol.toStringTag, { value: "Module" }));
const CalendarButton = () => {
  const [loading, setLoading] = useState(false);
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: "calendar-button",
      onClick: () => {
      },
      disabled: loading,
      children: "📅 Link to Google Calendar"
    }
  );
};
const UpcomingTasks = ({ application, onSuccess }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [countdowns, setCountdowns] = useState({});
  useEffect(() => {
    if (application == null ? void 0 : application.id) {
      fetchTaskCards();
    }
  }, [application == null ? void 0 : application.id]);
  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdowns = {};
      tasks.forEach((task) => {
        const now = (/* @__PURE__ */ new Date()).getTime();
        const target = new Date(task.due_date).getTime();
        const difference = target - now;
        if (difference > 0) {
          const days = Math.floor(difference / (1e3 * 60 * 60 * 24));
          const hours = Math.floor(difference % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
          const minutes = Math.floor(difference % (1e3 * 60 * 60) / (1e3 * 60));
          let timeLeft = "";
          if (days > 0) {
            timeLeft = `${days}d ${hours}h ${minutes}m`;
          } else if (hours > 0) {
            timeLeft = `${hours}h ${minutes}m`;
          } else {
            timeLeft = `${minutes}m left`;
          }
          newCountdowns[task.id] = { timeLeft, isOverdue: false };
        } else {
          newCountdowns[task.id] = { timeLeft: "Overdue", isOverdue: true };
        }
      });
      setCountdowns(newCountdowns);
    }, 1e3);
    return () => clearInterval(timer);
  }, [tasks]);
  const formatTaskDate = (dateString) => {
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return "Invalid Date";
      return dateObj.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (error2) {
      return "Invalid Date";
    }
  };
  const handleSubmit = async (data) => {
    data.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title,
          description,
          due_date: dueDateTime,
          job_application_id: application.id
        })
      });
      const data2 = await response.json();
      if (response.ok) {
        if (onSuccess) {
          onSuccess();
        }
        setShowAddForm(false);
        setTitle("");
        setDescription("");
        setDueDateTime("");
        fetchTaskCards();
      } else {
        setError(data2.message || "Failed to add task");
      }
    } catch (error2) {
      console.error("Network error:", error2);
      setError("Network error. Please check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };
  const fetchTaskCards = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/FetchTask/${application.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(Array.isArray(data) ? data : []);
      } else {
        setError(data.message || "Failed to fetch tasks");
      }
    } catch (error2) {
      console.error("Error fetching tasks:", error2);
      setError("Failed to load tasks");
    } finally {
      setFetchLoading(false);
    }
  };
  const deleteTask = async (taskID) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/DeleteTask/${taskID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.ok) {
        console.log("Deleted Task successfully.");
        fetchTaskCards();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete task");
      }
    } catch (error2) {
      console.error("Error deleting task:", error2);
      setError("Failed to delete task");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "upcoming-tasks-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "tasks-header", children: [
      /* @__PURE__ */ jsx("h2", { children: "Upcoming Tasks" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "add-task-btn",
          onClick: () => setShowAddForm(!showAddForm),
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 16 }),
            "Add Task"
          ]
        }
      )
    ] }),
    showAddForm && /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "add-task-form", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Task title",
          value: title,
          onChange: (e) => setTitle(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          placeholder: "Description (optional)",
          value: description,
          onChange: (e) => setDescription(e.target.value)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsx("p", { children: "Due Date:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            placeholder: "Task Due Date",
            type: "datetime-local",
            value: dueDateTime,
            onChange: (e) => setDueDateTime(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-actions", children: [
        /* @__PURE__ */ jsx("button", { type: "submit", className: "save-btn", children: "Save Task" }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "cancel-btn", onClick: () => setShowAddForm(false), children: "Cancel" })
      ] })
    ] }) }),
    fetchLoading ? /* @__PURE__ */ jsx("div", { children: "Loading tasks..." }) : error ? /* @__PURE__ */ jsx("div", { className: "error-message", children: error }) : tasks.length === 0 ? /* @__PURE__ */ jsx("div", { className: "empty-tasks", children: "No tasks found for this application" }) : tasks.map((task) => {
      const countdown = countdowns[task.id] || { timeLeft: "Calculating...", isOverdue: false };
      return /* @__PURE__ */ jsx("div", { className: "taskDisplay", children: /* @__PURE__ */ jsxs("div", { className: `taskCard ${task.is_completed ? "completed" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "task-header", children: [
          /* @__PURE__ */ jsx("div", { className: "task-title", children: /* @__PURE__ */ jsx("h3", { children: task.title }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "task-delete-btn",
              onClick: () => deleteTask(task.id),
              "aria-label": "Delete task",
              children: "×"
            }
          )
        ] }),
        task.description && /* @__PURE__ */ jsx("div", { className: "task-description", children: /* @__PURE__ */ jsx("p", { children: task.description }) }),
        /* @__PURE__ */ jsx("div", { className: "calendarButton", children: /* @__PURE__ */ jsx(CalendarButton, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "task-due-date", children: [
          /* @__PURE__ */ jsx("strong", { children: "Due: " }),
          formatTaskDate(task.due_date)
        ] }),
        /* @__PURE__ */ jsx("div", { className: `task-countdown ${countdown.isOverdue ? "overdue" : ""}`, children: countdown.timeLeft })
      ] }, task.id) });
    })
  ] });
};
const EditTask = ({
  application,
  onSuccess
}) => {
  const {
    id
  } = useParams();
  const [fetchLoading, setFetchLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [workType, setWorkType] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [notes, setNotes] = useState("");
  const [progressionStatus, setProgressionStatus] = useState("");
  const [applicationState, setApplicationState] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) {
        setError("No application ID provided");
        setFetchLoading(false);
        return;
      }
      try {
        setFetchLoading(true);
        const response = await fetch(`http://localhost:5000/api/auth/SingleApplication/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setApplicationState(data);
          populateForm(data);
        } else {
          setError(data.message || "Failed to fetch application");
        }
      } catch (error2) {
        console.error("Failed to fetch application:", error2);
        setError("Failed to load application data");
      } finally {
        setFetchLoading(false);
      }
    };
    fetchApplication();
  }, [id]);
  const populateForm = (app) => {
    setJobTitle(app.job_title);
    setCompany(app.company_name);
    setSalary(app.salary_range || "");
    setJobLink(app.job_url || "");
    setNotes(app.notes || "");
    setProgressionStatus(app.status);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/EditApplication/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          job_title: jobTitle,
          company_name: company,
          salary_range: salary,
          status: progressionStatus,
          job_url: jobLink,
          notes,
          previous_status: progressionStatus
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Application updated successfully:", data);
        if (onSuccess) {
          onSuccess();
        }
        navigate("/progressLine");
      } else {
        setError(data.message || "Failed to update application");
      }
    } catch (error2) {
      console.error("Network error:", error2);
      setError("Network error. Please check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };
  if (fetchLoading) {
    return /* @__PURE__ */ jsx("div", {
      className: "background",
      children: /* @__PURE__ */ jsx("div", {
        style: {
          paddingTop: "2rem"
        },
        children: /* @__PURE__ */ jsx("div", {
          className: "container",
          children: /* @__PURE__ */ jsx("div", {
            children: "Loading application data..."
          })
        })
      })
    });
  }
  if (error && !application) {
    return /* @__PURE__ */ jsx("div", {
      className: "background",
      children: /* @__PURE__ */ jsx("div", {
        style: {
          paddingTop: "2rem"
        },
        children: /* @__PURE__ */ jsxs("div", {
          className: "container",
          children: [/* @__PURE__ */ jsxs("div", {
            style: {
              color: "red"
            },
            children: ["Error: ", error]
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => navigate("/progressLine"),
            children: "Back to Job Progress Line"
          })]
        })
      })
    });
  }
  const onCancel = () => {
    navigate("/progressLine");
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("div", {
      className: "background",
      children: /* @__PURE__ */ jsx("div", {
        style: {
          paddingTop: "2rem"
        },
        children: /* @__PURE__ */ jsxs("div", {
          className: "GridContainer",
          children: [/* @__PURE__ */ jsx("div", {
            className: "UpcomingTasks",
            children: /* @__PURE__ */ jsx(UpcomingTasks, {
              application: applicationState,
              onSuccess
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "TaskContainer",
            children: /* @__PURE__ */ jsxs("form", {
              onSubmit: handleSubmit,
              children: [/* @__PURE__ */ jsxs("div", {
                className: "form",
                children: [/* @__PURE__ */ jsx("h2", {
                  children: " Edit Task"
                }), error && /* @__PURE__ */ jsx("div", {
                  className: "error-message",
                  style: {
                    color: "red",
                    marginBottom: "1rem"
                  },
                  children: error
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  name: "jobTitle",
                  value: jobTitle,
                  onChange: (e) => setJobTitle(e.target.value),
                  placeholder: "Enter job title",
                  required: true,
                  disabled: loading
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  name: "company",
                  value: company,
                  onChange: (e) => setCompany(e.target.value),
                  placeholder: "Company Name",
                  required: true,
                  disabled: loading
                }), /* @__PURE__ */ jsx("input", {
                  type: "number",
                  name: "salary",
                  value: salary,
                  onChange: (e) => setSalary(e.target.value),
                  placeholder: "Enter salary",
                  required: true,
                  disabled: loading,
                  min: "0",
                  step: "1000"
                }), /* @__PURE__ */ jsxs("select", {
                  name: "workType",
                  value: workType,
                  onChange: (e) => setWorkType(e.target.value),
                  disabled: loading,
                  children: [/* @__PURE__ */ jsx("option", {
                    value: "",
                    children: "Select work type"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "full-time",
                    children: "Full Time"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "part-time",
                    children: "Part Time"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "casual",
                    children: "Casual"
                  })]
                }), /* @__PURE__ */ jsx("input", {
                  type: "url",
                  name: "jobLink",
                  value: jobLink,
                  onChange: (e) => setJobLink(e.target.value),
                  placeholder: "Job Link",
                  required: true,
                  disabled: loading
                }), /* @__PURE__ */ jsx("textarea", {
                  className: "additional-notes",
                  name: "notes",
                  value: notes,
                  onChange: (e) => setNotes(e.target.value),
                  placeholder: "Additional Notes",
                  disabled: loading
                }), /* @__PURE__ */ jsxs("select", {
                  name: "progressionStatus",
                  value: progressionStatus,
                  onChange: (e) => setProgressionStatus(e.target.value),
                  required: true,
                  disabled: loading,
                  children: [/* @__PURE__ */ jsx("option", {
                    value: "",
                    children: "Select progression status"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "Applied",
                    children: "Applied"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "CognitiveTesting",
                    children: "Cognitive Test"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "DigitalInterview",
                    children: "Digital Interview"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "CodeExam",
                    children: "Code Exam"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "Interview",
                    children: "In-Person Interview"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "submitButtons",
                children: [/* @__PURE__ */ jsx("button", {
                  type: "submit",
                  disabled: loading,
                  children: loading ? "Updating Application..." : "Update Application"
                }), /* @__PURE__ */ jsx("button", {
                  type: "button",
                  onClick: onCancel,
                  disabled: loading,
                  children: "Back to Job Progress Line"
                })]
              })]
            })
          })]
        })
      })
    })
  });
};
const editTask = withComponentProps(EditTask);
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: editTask
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Bx6IGMIZ.js", "imports": ["/assets/chunk-DQRVZFIR-CtLrds9g.js", "/assets/index-CaCXX25L.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Bt-7BNjI.js", "imports": ["/assets/chunk-DQRVZFIR-CtLrds9g.js", "/assets/index-CaCXX25L.js", "/assets/with-props-DSW1myl8.js"], "css": ["/assets/root-DDcl4ypP.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_layout": { "id": "routes/_layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_layout-D-PjoToD.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js"], "css": ["/assets/_layout-jS5-sSZw.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "routes/_layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-BVqtvNOG.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js", "/assets/UpcomingTasks-C5k-Qr4z.js"], "css": ["/assets/_index-Bl6aRh5y.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/features": { "id": "routes/features", "parentId": "routes/_layout", "path": "features", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/features-hZFrxKSc.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js", "/assets/UpcomingTasks-C5k-Qr4z.js"], "css": ["/assets/features-Btj67bSz.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "routes/_layout", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-DphhTO0Y.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js"], "css": ["/assets/about-CsziHPeJ.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "routes/_layout", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-DpcfkgEi.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js"], "css": ["/assets/login-DQF4Rsag.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signup": { "id": "routes/signup", "parentId": "routes/_layout", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-XGPq_3ya.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js"], "css": ["/assets/signup-yFBlJ9-U.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/forgotpassword": { "id": "routes/forgotpassword", "parentId": "routes/_layout", "path": "forgotpassword", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/forgotpassword-BKQIsgij.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js"], "css": ["/assets/forgotpassword-DzF1Jy28.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/loggedin/_layout": { "id": "routes/loggedin/_layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_layout-BhwwFDce.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js"], "css": ["/assets/_layout-DWfVF9Bb.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/loggedin/dashboard": { "id": "routes/loggedin/dashboard", "parentId": "routes/loggedin/_layout", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-BAzw61HC.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js", "/assets/createLucideIcon-DpBpHvh4.js"], "css": ["/assets/dashboard-dFh7ygwg.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/loggedin/settings": { "id": "routes/loggedin/settings", "parentId": "routes/loggedin/_layout", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/loggedin/progressLine": { "id": "routes/loggedin/progressLine", "parentId": "routes/loggedin/_layout", "path": "progressLine", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/progressLine-BCrNzrGq.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js", "/assets/index-CaCXX25L.js"], "css": ["/assets/progressLine-Dusk7MvX.css", "/assets/editTask-Cx_0nM5H.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/loggedin/editTask": { "id": "routes/loggedin/editTask", "parentId": "routes/loggedin/_layout", "path": "editTask/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/editTask-C3jkJE9r.js", "imports": ["/assets/with-props-DSW1myl8.js", "/assets/chunk-DQRVZFIR-CtLrds9g.js", "/assets/createLucideIcon-DpBpHvh4.js"], "css": ["/assets/editTask-CqqzuRTJ.css", "/assets/editTask-Cx_0nM5H.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-74eee7b5.js", "version": "74eee7b5", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_layout": {
    id: "routes/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "routes/_layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/features": {
    id: "routes/features",
    parentId: "routes/_layout",
    path: "features",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/about": {
    id: "routes/about",
    parentId: "routes/_layout",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/login": {
    id: "routes/login",
    parentId: "routes/_layout",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "routes/_layout",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/forgotpassword": {
    id: "routes/forgotpassword",
    parentId: "routes/_layout",
    path: "forgotpassword",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/loggedin/_layout": {
    id: "routes/loggedin/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/loggedin/dashboard": {
    id: "routes/loggedin/dashboard",
    parentId: "routes/loggedin/_layout",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/loggedin/settings": {
    id: "routes/loggedin/settings",
    parentId: "routes/loggedin/_layout",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/loggedin/progressLine": {
    id: "routes/loggedin/progressLine",
    parentId: "routes/loggedin/_layout",
    path: "progressLine",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/loggedin/editTask": {
    id: "routes/loggedin/editTask",
    parentId: "routes/loggedin/_layout",
    path: "editTask/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
