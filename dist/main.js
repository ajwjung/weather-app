(() => {
  "use strict";
  const e = (() => {
      const e = document.querySelector("body"),
        t = document.querySelectorAll("button"),
        n = document.getElementById("city"),
        a = document.getElementById("date"),
        r = document.getElementById("weather-icon"),
        o = document.getElementById("current-temp"),
        s = document.getElementById("feels-like"),
        c = document.getElementById("generic-report"),
        i = document.getElementById("humidity"),
        l = document.getElementById("wind-speed"),
        m = document.getElementById("alt-units"),
        d = document.getElementById("current-deg"),
        g = document.getElementById("feels-like-deg"),
        u = document.getElementById("wind-unit");
      return {
        setUnits: (e) => {
          "metric" === e
            ? ((m.textContent = "°F"),
              (d.textContent = " C"),
              (g.textContent = " C"),
              (u.textContent = " km/h"))
            : "imperial" === e &&
              ((m.textContent = "°C"),
              (d.textContent = " F"),
              (g.textContent = " F"),
              (u.textContent = " mph"));
        },
        displayWeather: (m) => {
          var d;
          ((n) => {
            switch (n) {
              case "Clear":
                (e.style.background =
                  "linear-gradient(to bottom, rgb(109, 180, 207), rgb(245, 236, 218))"),
                  (e.style.color = "#2c3853"),
                  t.forEach((e) => {
                    e.style.color = "#2c3853";
                  });
                break;
              case "Clouds":
                (e.style.background =
                  "linear-gradient(to bottom, rgb(133, 149, 158), rgb(200, 200, 200))"),
                  (e.style.color = "#202020"),
                  t.forEach((e) => {
                    e.style.color = "#202020";
                  });
                break;
              case "Drizzle":
              case "Rain":
                (e.style.background =
                  "linear-gradient(to bottom, rgb(68, 77, 82), rgb(140, 146, 148))"),
                  (e.style.color = "white"),
                  t.forEach((e) => {
                    e.style.color = "white";
                  });
                break;
              case "Thunderstorm":
                (e.style.background =
                  "linear-gradient(to bottom, rgb(19, 23, 26), rgb(77, 83, 85))"),
                  (e.style.color = "white"),
                  t.forEach((e) => {
                    e.style.color = "white";
                  });
                break;
              case "Snow":
              case "Smoke":
              case "Haze":
              case "Dust":
              case "Mist":
                (e.style.background =
                  "linear-gradient(to bottom, rgb(134, 141, 146), rgb(216, 230, 235))"),
                  (e.style.color = "#2c4374"),
                  t.forEach((e) => {
                    e.style.color = "#2c4374";
                  });
                break;
              default:
                (e.style.background =
                  "linear-gradient(to bottom, rgb(109, 180, 207), rgb(245, 236, 218))"),
                  (e.color = "white"),
                  t.forEach((e) => {
                    e.style.color = "white";
                  });
            }
          })(m.weather[0].main),
            (n.textContent = `${m.name}, ${m.sys.country}`),
            (a.textContent = ((e) => {
              const t = new Date(),
                n = t.getTime(),
                a = 6e4 * t.getTimezoneOffset(),
                r = new Date(n + a + 1e3 * e);
              return `${r.toDateString()}, ${r.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
            })(m.timezone)),
            (o.textContent = `${Math.floor(m.main.temp)}°`),
            (s.textContent = `${Math.floor(m.main.feels_like)}°`),
            (c.textContent =
              (d = m.weather[0].description).charAt(0).toUpperCase() +
              d.slice(1)),
            ((e) => {
              switch (e) {
                case "Clear":
                  (r.src = "../src/imgs/weather-sunny.svg"),
                    (r.className = "blue-filter");
                  break;
                case "Clouds":
                  (r.src = "../src/imgs/clouds.svg"),
                    (r.className = "darkgray-filter");
                  break;
                case "Rain":
                  (r.src = "../src/imgs/weather-pouring.svg"),
                    (r.className = "white-filter");
                  break;
                case "Thunderstorm":
                  (r.src = "../src/imgs/weather-lightning.svg"),
                    (r.className = "white-filter");
                  break;
                case "Snow":
                case "Smoke":
                case "Haze":
                case "Dust":
                case "Mist":
                  (r.src = "../src/imgs/snowflake.svg"),
                    (r.className = "blue-filter");
                  break;
                default:
                  (r.src = "../src/imgs/thermometer.svg"),
                    (r.className = "blue-filter");
              }
            })(m.weather[0].main),
            (i.textContent = m.main.humidity),
            (l.textContent = m.wind.speed);
        },
      };
    })(),
    t = async function (e, t) {
      try {
        const n = "f6d50020f2b429ca9a34a9206321e0c7",
          a = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${e}&units=${t}&appid=${n}`
          );
        return await a.json();
      } catch (e) {
        console.log(e);
      }
      return null;
    },
    n = (() => {
      const n = document.querySelector("form");
      let a = "San Francisco";
      const r = () => a;
      return {
        getData: () => {
          const o = document.getElementById("user-input");
          n.addEventListener("submit", async (n) => {
            var s;
            n.preventDefault(), (s = o.value), (a = s);
            const c = await t(r(), "imperial");
            e.displayWeather(c);
          });
        },
        readLocation: r,
      };
    })(),
    a = (() => {
      const r = document.getElementById("units-btn");
      let o = "imperial";
      return {
        changeUnit: () => {
          "imperial" === o
            ? (o = "metric")
            : "metric" === o && (o = "imperial");
        },
        getCurrentUnit: () => o,
        updateDisplayUnits: () => {
          r.addEventListener("click", async () => {
            a.changeUnit();
            const r = a.getCurrentUnit();
            e.setUnits(r);
            const o = n.readLocation(),
              s = await t(o, r);
            e.displayWeather(s);
          });
        },
      };
    })(),
    r = a;
  window.addEventListener("load", async () => {
    const n = await t("San Francisco", "imperial");
    e.displayWeather(n), e.setUnits("imperial");
  }),
    n.getData(),
    r.updateDisplayUnits();
})();
