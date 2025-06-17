let e;
function t(e) {
  let t = [],
    n = e,
    l = (e) => {
      t.forEach((t) => {
        t(e);
      });
    };
  return {
    set: (e) => {
      e !== n && ((n = e), l(e));
    },
    get: () => n,
    onChange: (e) => (
      t.push(e),
      () => {
        t.splice(t.indexOf(e), 1);
      }
    ),
  };
}
const n = (e, t, n, l, r) => ((e - t) * (r - l)) / (n - t) + l;
function l(e, t, l, r, o, i, s, a) {
  let u = e.x - t,
    c = e.y - l,
    y = (Math.pow(u, 2) + Math.pow(c, 2)) / 1e5;
  if (!r) {
    (e.linkElm.style.opacity = "0"),
      (e.elm.style.transition = `opacity 0.1s linear ${(1 - y) * 0.12}s`),
      (e.elm.style.opacity = "0");
    return;
  }
  let m = n(a.length, 0, 10, 0.8, 0.4);
  if (!(y < 0.05 + 0.02 * m) && !(y > 0.2)) {
    let n = -(0.035 * u),
      r = -(0.035 * c),
      o = t - e.x,
      i = l - e.y,
      a = e.x + m * o,
      y = e.y + 0.7 * i;
    e.linkElm.setAttributeNS(null, "x1", `${e.x + n}`),
      e.linkElm.setAttributeNS(null, "y2", `${e.y + r}`),
      e.linkElm.setAttributeNS(null, "x2", `${a}`),
      e.linkElm.setAttributeNS(null, "y2", `${y}`),
      (e.elm.style.transition = `
      opacity 0.1s linear,
      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0s
    `),
      (e.elm.style.opacity = "1"),
      (e.linkElm.style.opacity = "1"),
      (e.elm.style.transform = `translate(${n}px, ${r}px)`),
      (e.linkElm.style.stroke = s),
      (e.elm.style.stroke = s),
      (e.elm.style.fill = s);
    return;
  }
  (e.linkElm.style.opacity = "0"),
    (e.linkElm.style.stroke = i),
    (e.elm.style.stroke = i),
    (e.elm.style.strokeWidth = "2.5"),
    (e.elm.style.fill = "transparent"),
    (e.elm.style.transition = `
    opacity 0.1s linear ${0.1 * y}s,
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * y}s
  `),
    (e.elm.style.transform = `${
      o
        ? `translate(${-(0.02 * u)}px, ${-(0.02 * c)}px)`
        : "translate(0px, 0px)"
    }`),
    (e.elm.style.opacity = `${o ? 0.2 * y : 10 * y}`);
}
window.addEventListener("resize", () => {
  e && e(), (e = r());
}),
  window.addEventListener("load", () => {
    e && e(), (e = r());
  });
const r = () => {
  let e = [...document.querySelectorAll(".image-link")].map((e) => {
    let n = e.querySelector(".label");
    return (function (
      e,
      n = 75,
      r = 8,
      o = "Label",
      i = "rgb(192, 196, 213)",
      s = "rgba(170, 244, 105, 1)"
    ) {
      let a = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        u = e.getBoundingClientRect(),
        c = u.width,
        y = u.height;
      return (
        a.setAttributeNS(null, "width", c.toString()),
        a.setAttributeNS(null, "height", y.toString()),
        (a.style.position = "absolute"),
        (a.style.width = "100%"),
        (a.style.height = "100%"),
        (a.style.top = "0px"),
        (a.style.left = "0px"),
        (a.style.overflow = "visible"),
        e.appendChild(a),
        (function (
          e,
          n,
          r,
          o = 75,
          i = 8,
          s = "hello",
          a = "rgb(192, 196, 213)",
          u = "rgba(170, 244, 105, 1)"
        ) {
          let c;
          let y = t(!1),
            m = t({ x: 0, y: 0 }),
            p = t(!1),
            d = Math.floor(n / o),
            f = Math.floor(r / o),
            h = Math.round((n - i) / (d - 1)),
            w = Math.round((r - i) / (f - 1)),
            E = (function (e, t, n) {
              let l = [];
              for (let r = 0; r < t; r++)
                for (let t = 0; t < e; t++) {
                  let e = n({ col: t, row: r });
                  l.push({ ...e, col: t, row: r });
                }
              return { cols: e, rows: t, items: l };
            })(d, f, ({ col: t, row: n }) => {
              let l = t * h,
                r = n * w,
                o = (function (e, t, n, l) {
                  let r = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect"
                  );
                  return (
                    r.setAttributeNS(null, "width", `${n}`),
                    r.setAttributeNS(null, "height", `${n}`),
                    r.setAttributeNS(null, "x", `${e}`),
                    r.setAttributeNS(null, "y", `${t}`),
                    (r.style.opacity = "0"),
                    r
                  );
                })(l, r, i, 0),
                s = (function (e, t, n) {
                  let l = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                  );
                  return (
                    l.setAttributeNS(null, "x1", `${e + 4}`),
                    l.setAttributeNS(null, "y1", `${t + 4}`),
                    l.setAttributeNS(null, "x2", `${e}`),
                    l.setAttributeNS(null, "y2", `${t}`),
                    l.setAttributeNS(null, "stroke", `${n}`),
                    (l.style.strokeWidth = "1.5"),
                    (l.style.strokeDasharray = "2"),
                    (l.style.opacity = "0"),
                    l
                  );
                })(l, r, a);
              return (
                e.appendChild(o),
                e.appendChild(s),
                { size: i, col: t, row: n, elm: o, linkElm: s, x: l, y: r }
              );
            }),
            g = (function (e) {
              let t = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
              );
              return (
                t.setAttributeNS(null, "x", "0"),
                t.setAttributeNS(null, "y", "0"),
                t.setAttributeNS(null, "fill", "#FFF"),
                t.setAttributeNS(null, "font-size", "16px"),
                (t.style.pointerEvents = "none"),
                (t.style.userSelect = "none"),
                (t.style.opacity = "0"),
                (t.innerHTML = e),
                t
              );
            })(s);
          e.appendChild(g);
          let x = e.getBoundingClientRect(),
            b = window.scrollY,
            v = () => {
              b = window.scrollY;
            },
            S = x.x,
            $ = x.y + window.scrollY;
          window.addEventListener("scroll", v);
          let N = (e) => {
              let t = e.clientX - S,
                n = e.clientY - ($ - b);
              m.set({ x: t, y: n });
            },
            A = () => {},
            L = (e) => {
              y.set(!0),
                A(),
                (A = (function (e, t) {
                  let n = e.parentElement;
                  if (!n)
                    return (
                      console.error(
                        "Parent element of <text> element not found."
                      ),
                      () => {}
                    );
                  let l = Array.from(n.children).indexOf(e),
                    r = setInterval(() => {
                      console.log("shuffle"),
                        (function (e) {
                          if (!e.parentElement) {
                            console.error(
                              "Parent element of <text> element not found."
                            );
                            return;
                          }
                          e.innerHTML = (function (e) {
                            let t = e.split("");
                            for (let e = t.length - 1; e > 0; e--) {
                              let n = Math.floor(Math.random() * (e + 1));
                              [t[e], t[n]] = [t[n], t[e]];
                            }
                            return t.join("");
                          })(e.innerHTML);
                        })(e);
                    }, 1e3 / 24),
                    o = () => {
                      let o = e.parentElement;
                      o &&
                        Array.from(o.children).indexOf(e) !== l &&
                        n.appendChild(e),
                        (e.textContent = t),
                        clearInterval(r);
                    },
                    i = setTimeout(o, 400);
                  return () => {
                    o(), clearTimeout(i);
                  };
                })(g, s));
            },
            k = (e) => {
              y.set(!1), A();
            },
            M = (function (...e) {
              return (t) => {
                let n = () => {
                    t(...e.map((e) => e.get()));
                  },
                  l = e.map((e) =>
                    e.onChange(() => {
                      n();
                    })
                  );
                return () => {
                  l.forEach((e) => e());
                };
              };
            })(
              m,
              y,
              p
            )((e, t, n) => {
              if (((g.style.transform = `translate(${e.x}px, ${e.y}px)`), !t)) {
                E.items.forEach((t) => l(t, e.x, e.y, !1, n, a, u, s)),
                  (g.style.opacity = "0");
                return;
              }
              (g.style.opacity = "1"),
                E.items.forEach((t) => l(t, e.x, e.y, !0, n, a, u, s));
            }),
            C = Date.now(),
            T = () => {
              p.set(!0), (C = Date.now());
            },
            H = () => {
              c && clearTimeout(c),
                (c = setTimeout(
                  () => p.set(!1),
                  Math.max(0, 270 - (Date.now() - C))
                ));
            };
          return (
            e.addEventListener("pointermove", N),
            e.addEventListener("pointerenter", L),
            e.addEventListener("pointerleave", k),
            e.addEventListener("pointerdown", T),
            e.addEventListener("pointerup", H),
            {
              grid: E,
              cleanup: () => {
                e.removeEventListener("pointermove", N),
                  e.removeEventListener("pointerenter", L),
                  e.removeEventListener("pointerleave", k),
                  e.removeEventListener("pointerdown", T),
                  e.removeEventListener("pointerup", H),
                  window.removeEventListener("scroll", v),
                  M(),
                  (e.innerHTML = "");
              },
            }
          );
        })(a, c, y, n, r, o, i, s).cleanup
      );
    })(
      e,
      75,
      5.5,
      n?.innerHTML,
      "rgb(192, 196, 213)",
      n?.innerHTML.toLowerCase() === "coming soon"
        ? "rgba(192, 196, 213,.5)"
        : "rgba(170, 244, 105, 1)"
    );
  });
  return () => {
    e.forEach((e) => e());
  };
};
//# sourceMappingURL=index.50e1f2c5.js.map
