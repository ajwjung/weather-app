(() => {
  "use strict";
  const e = (() => {
      const e = document.querySelector("body"),
        t = document.querySelectorAll("button"),
        r = document.getElementById("city"),
        n = document.getElementById("date"),
        a = document.getElementById("weather-icon"),
        o = document.getElementById("current-temp"),
        i = document.getElementById("feels-like"),
        c = document.getElementById("generic-report"),
        s = document.getElementById("humidity"),
        l = document.getElementById("wind-speed"),
        d = document.getElementById("alt-units"),
        u = document.querySelectorAll(".daily-report"),
        m = document.querySelectorAll(".daily-high"),
        h = document.querySelectorAll(".daily-low"),
        g = document.getElementById("current-deg"),
        y = document.getElementById("feels-like-deg"),
        p = document.getElementById("wind-unit"),
        w = document.querySelectorAll(".deg-unit"),
        f = document.querySelectorAll(".hour-report"),
        b = document.querySelectorAll(".three-hour-temp"),
        C = (e) => {
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
              (g.textContent = " C"),
              (y.textContent = " C"),
              (p.textContent = " km/h"),
              w.forEach((e) => {
                e.textContent = "°C";
              }))
            : "imperial" === e &&
              ((d.textContent = "°C"),
              (g.textContent = " F"),
              (y.textContent = " F"),
              (p.textContent = " mph"),
              w.forEach((e) => {
                e.textContent = "°F";
              }));
        },
        displayCurrentWeather: (d) => {
          ((r) => {
            switch (r) {
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
            (r.textContent = `${d.name}, ${d.sys.country}`);
          const u = ((e) => {
            const t = new Date(),
              r = t.getTime(),
              n = 6e4 * t.getTimezoneOffset();
            return new Date(r + n + 1e3 * e);
          })(d.timezone);
          var m;
          (n.textContent = `${u.toDateString()}, ${u.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`),
            (o.textContent = `${Math.floor(d.main.temp)}°`),
            (i.textContent = `${Math.floor(d.main.feels_like)}°`),
            (c.textContent =
              (m = d.weather[0].description).charAt(0).toUpperCase() +
              m.slice(1));
          const [h, g] = C(d.weather[0].main);
          (a.src = h),
            (a.className = g),
            (s.textContent = d.main.humidity),
            (l.textContent = d.wind.speed);
        },
        displayFiveDayWeather: (e) => {
          const t = ((e) => {
            const t = [];
            for (let r = 0; r < e.list.length; r += 8) t.push(e.list[r]);
            return t;
          })(e);
          for (let a = 0; a < u.length; a += 1) {
            const [o, i] = u[a].children;
            o.textContent =
              ((r = e.city.timezone),
              (n = t[a].dt),
              ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"][
                new Date(1e3 * (r + n)).getDay()
              ]);
            const [c, s] = C(t[a].weather[0].main);
            (i.src = c),
              i.classList.add(s),
              (m[a].textContent = Math.floor(t[a].main.temp_max)),
              (h[a].textContent = Math.floor(t[a].main.temp_min));
          }
          var r, n;
        },
        displayThreeHourWeather: (e) => {
          const t = e.list.slice(0, 8),
            r = [];
          t.forEach((e) => {
            const t = ((e) => {
              const t = e.getHours();
              return t > 12 ? t - 12 + "pm" : `${t}am`;
            })(new Date(1e3 * e.dt));
            r.push({
              timeOfDay: t,
              weather: e.weather[0].main,
              temp: e.main.temp,
            });
          });
          for (let e = 0; e < f.length; e += 1) {
            const [t, n] = f[e].children;
            t.textContent = r[e].timeOfDay;
            const [a, o] = C(r[e].weather);
            (n.src = a),
              (n.classList = o),
              (b[e].textContent = Math.floor(r[e].temp));
          }
        },
      };
    })(),
    t = async function (e, t) {
      try {
        const r = "f6d50020f2b429ca9a34a9206321e0c7",
          n = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${e}&units=${t}&appid=${r}`,
            { mode: "cors" }
          );
        return await n.json();
      } catch (e) {
        alert(e);
      }
      return null;
    },
    r = async function (e, t) {
      try {
        const r = "f6d50020f2b429ca9a34a9206321e0c7",
          n = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=${t}&appid=${r}`,
            { mode: "cors" }
          );
        return await n.json();
      } catch (e) {
        alert(e);
      }
      return null;
    },
    n = async function (e, t) {
      try {
        const r = "f6d50020f2b429ca9a34a9206321e0c7",
          n = await fetch(
            ` http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=1&appid=${r}`,
            { mode: "cors" }
          ),
          a = await n.json(),
          { lat: o, lon: i } = a[0],
          c = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${o}&lon=${i}&units=${t}&appid=${r}`,
            { mode: "cors" }
          );
        return await c.json();
      } catch (e) {
        alert(e);
      }
      return null;
    },
    a = (() => {
      const a = document.querySelector("form"),
        o = document.getElementById("user-input");
      let i = "San Francisco";
      const c = () => i;
      return {
        getData: () => {
          const s = document.getElementById("user-input");
          a.addEventListener("submit", async (a) => {
            var l;
            a.preventDefault(), (l = s.value), (i = l);
            const d = await t(c(), "imperial");
            e.displayCurrentWeather(d);
            const u = await r(c(), "imperial");
            e.displayFiveDayWeather(u);
            const m = await n(c(), "imperial");
            e.displayThreeHourWeather(m), (o.value = "");
          });
        },
        readLocation: c,
      };
    })(),
    o = (() => {
      const i = document.getElementById("units-btn");
      let c = "imperial";
      return {
        changeUnit: () => {
          "imperial" === c
            ? (c = "metric")
            : "metric" === c && (c = "imperial");
        },
        getCurrentUnit: () => c,
        updateDisplayUnits: () => {
          i.addEventListener("click", async () => {
            o.changeUnit();
            const i = o.getCurrentUnit();
            e.setUnits(i);
            const c = a.readLocation(),
              s = await t(c, i);
            e.displayCurrentWeather(s);
            const l = await r(c, i);
            e.displayFiveDayWeather(l);
            const d = await n(c, i);
            e.displayThreeHourWeather(d);
          });
        },
      };
    })(),
    i = o;
  window.addEventListener("load", async () => {
    try {
      const a = await t("San Francisco", "imperial");
      e.displayCurrentWeather(a);
      const o = await r("San Francisco", "imperial");
      e.displayFiveDayWeather(o);
      const i = await n("San Francisco", "imperial");
      e.displayThreeHourWeather(i), e.setUnits("imperial");
    } catch (e) {
      alert(e);
    }
  }),
    a.getData(),
    i.updateDisplayUnits();
})();
