(() => {
  "use strict";
  const e = (() => {
      const e = document.querySelector("body"),
        t = document.querySelectorAll("button"),
        n = document.getElementById("city"),
        r = document.getElementById("date"),
        a = document.getElementById("weather-icon"),
        o = document.getElementById("current-temp"),
        i = document.getElementById("feels-like"),
        c = document.getElementById("generic-report"),
        s = document.getElementById("humidity"),
        l = document.getElementById("wind-speed"),
        d = document.getElementById("alt-units"),
        u = document.querySelectorAll(".daily-report"),
        m = document.querySelectorAll(".daily-high"),
        g = document.querySelectorAll(".daily-low"),
        y = document.getElementById("current-deg"),
        h = document.getElementById("feels-like-deg"),
        p = document.getElementById("wind-unit"),
        w = document.querySelectorAll(".deg-unit"),
        f = (e) => {
          switch (e) {
            case "Clear":
              return ["../src/imgs/weather-sunny.svg", "blue-filter"];
            case "Clouds":
              return ["../src/imgs/clouds.svg", "darkgray-filter"];
            case "Rain":
              return ["../src/imgs/weather-pouring.svg", "white-filter"];
            case "Thunderstorm":
              return ["../src/imgs/weather-lightning.svg", "white-filter"];
            case "Fog":
              return ["../src/imgs/weather-fog.svg", "blue-filter"];
            case "Snow":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Mist":
              return ["../src/imgs/snowflake.svg", "blue-filter"];
            default:
              return ["../src/imgs/thermometer.svg", "blue-filter"];
          }
        };
      return {
        setUnits: (e) => {
          "metric" === e
            ? ((d.textContent = "°F"),
              (y.textContent = " C"),
              (h.textContent = " C"),
              (p.textContent = " km/h"),
              w.forEach((e) => {
                e.textContent = "°C";
              }))
            : "imperial" === e &&
              ((d.textContent = "°C"),
              (y.textContent = " F"),
              (h.textContent = " F"),
              (p.textContent = " mph"),
              w.forEach((e) => {
                e.textContent = "°F";
              }));
        },
        displayCurrentWeather: (d) => {
          var u;
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
              case "Fog":
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
          })(d.weather[0].main),
            (n.textContent = `${d.name}, ${d.sys.country}`),
            (r.textContent = ((e) => {
              const t = new Date(),
                n = t.getTime(),
                r = 6e4 * t.getTimezoneOffset(),
                a = new Date(n + r + 1e3 * e);
              return `${a.toDateString()}, ${a.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
            })(d.timezone)),
            (o.textContent = `${Math.floor(d.main.temp)}°`),
            (i.textContent = `${Math.floor(d.main.feels_like)}°`),
            (c.textContent =
              (u = d.weather[0].description).charAt(0).toUpperCase() +
              u.slice(1));
          const [m, g] = f(d.weather[0].main);
          (a.src = m),
            (a.className = g),
            (s.textContent = d.main.humidity),
            (l.textContent = d.wind.speed);
        },
        displayFiveDayWeather: (e) => {
          const t = ((e) => {
            const t = [];
            for (let n = 0; n < e.list.length; n += 8) t.push(e.list[n]);
            return t;
          })(e);
          for (let e = 0; e < u.length; e += 1) {
            const [r, a] = u[e].children;
            r.textContent =
              ((n = t[e].dt_txt),
              ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"][
                new Date(n).getDay()
              ]);
            const [o, i] = f(t[e].weather[0].main);
            (a.src = o),
              (a.className = i),
              (m[e].textContent = Math.floor(t[e].main.temp_max)),
              (g[e].textContent = Math.floor(t[e].main.temp_min));
          }
          var n;
        },
      };
    })(),
    t = async function (e, t) {
      try {
        const n = "f6d50020f2b429ca9a34a9206321e0c7",
          r = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${e}&units=${t}&appid=${n}`,
            { mode: "cors" }
          );
        return await r.json();
      } catch (e) {
        alert(e);
      }
      return null;
    },
    n = async function (e, t) {
      try {
        const n = "f6d50020f2b429ca9a34a9206321e0c7",
          r = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=${t}&appid=${n}`,
            { mode: "cors" }
          );
        return await r.json();
      } catch (e) {
        alert(e);
      }
      return null;
    },
    r = (() => {
      const r = document.querySelector("form"),
        a = document.getElementById("user-input");
      let o = "San Francisco";
      const i = () => o;
      return {
        getData: () => {
          const c = document.getElementById("user-input");
          r.addEventListener("submit", async (r) => {
            var s;
            r.preventDefault(), (s = c.value), (o = s);
            const l = await t(i(), "imperial");
            e.displayCurrentWeather(l);
            const d = await n(i(), "imperial");
            e.displayFiveDayWeather(d), (a.value = "");
          });
        },
        readLocation: i,
      };
    })(),
    a = (() => {
      const o = document.getElementById("units-btn");
      let i = "imperial";
      return {
        changeUnit: () => {
          "imperial" === i
            ? (i = "metric")
            : "metric" === i && (i = "imperial");
        },
        getCurrentUnit: () => i,
        updateDisplayUnits: () => {
          o.addEventListener("click", async () => {
            a.changeUnit();
            const o = a.getCurrentUnit();
            e.setUnits(o);
            const i = r.readLocation(),
              c = await t(i, o);
            e.displayCurrentWeather(c);
            const s = await n(i, o);
            e.displayFiveDayWeather(s);
          });
        },
      };
    })(),
    o = a;
  window.addEventListener("load", async () => {
    try {
      const r = await t("San Francisco", "imperial");
      e.displayCurrentWeather(r);
      const a = await n("San Francisco", "imperial");
      e.displayFiveDayWeather(a), e.setUnits("imperial");
    } catch (e) {
      alert(e);
    }
  }),
    r.getData(),
    o.updateDisplayUnits();
})();
