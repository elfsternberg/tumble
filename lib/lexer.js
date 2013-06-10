module.exports = (function() {
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      function stringEscape(s) {
        function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

        return s
          .replace(/\\/g,   '\\\\')
          .replace(/"/g,    '\\"')
          .replace(/\x08/g, '\\b')
          .replace(/\t/g,   '\\t')
          .replace(/\n/g,   '\\n')
          .replace(/\f/g,   '\\f')
          .replace(/\r/g,   '\\r')
          .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
          .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
          .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
          .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
      }

      var expectedDesc, foundDesc;

      switch (expected.length) {
        case 0:
          expectedDesc = "end of input";
          break;

        case 1:
          expectedDesc = expected[0];
          break;

        default:
          expectedDesc = expected.slice(0, -1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }

      foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

      return "Expected " + expectedDesc + " but " + foundDesc + " found.";
    }

    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
    this.message  = buildMessage(expected, found);
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$startRuleFunctions = { document: peg$parsedocument },
        peg$startRuleFunction  = peg$parsedocument,

        peg$c0 = [],
        peg$c1 = function(ps) { return { unit: "block", name: "document", content: ps }; },
        peg$c2 = "tag_start",
        peg$c3 = null,
        peg$c4 = ":",
        peg$c5 = "\":\"",
        peg$c6 = function(b, n) { return {type: b, name: n }; },
        peg$c7 = "/",
        peg$c8 = "\"/\"",
        peg$c9 = "tagname",
        peg$c10 = /^[a-zA-Z]/,
        peg$c11 = "[a-zA-Z]",
        peg$c12 = function(t) { return t.join(''); },
        peg$c13 = "",
        peg$c14 = /^[a-zA-Z:\/]/,
        peg$c15 = "[a-zA-Z:\\/]",
        peg$c16 = "{",
        peg$c17 = "\"{\"",
        peg$c18 = "}",
        peg$c19 = "\"}\"",
        peg$c20 = "\n",
        peg$c21 = "\"\\n\"",
        peg$c22 = "\r\n",
        peg$c23 = "\"\\r\\n\"",
        peg$c24 = "\r",
        peg$c25 = "\"\\r\"",
        peg$c26 = "\u2028",
        peg$c27 = "\"\\u2028\"",
        peg$c28 = "\u2029",
        peg$c29 = "\"\\u2029\"",
        peg$c30 = "any character",
        peg$c31 = function(c) {return c},
        peg$c32 = function(bs) { return { unit: 'text', content: bs.join('') } },
        peg$c33 = "variable",
        peg$c34 = function(t) { return { unit: 'variable', name: t }; },
        peg$c35 = function(t, ps, n) { return (t.type == n.type) && (t.name == n.name) },
        peg$c36 = function(t, ps, n) { return {unit: 'block', type:t.type, name:t.name, content: ps } },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$cleanupExpected(expected) {
      var i = 0;

      expected.sort();

      while (i < expected.length) {
        if (expected[i - 1] === expected[i]) {
          expected.splice(i, 1);
        } else {
          i++;
        }
      }
    }

    function peg$parsedocument() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsepart();
      while (s2 !== null) {
        s1.push(s2);
        s2 = peg$parsepart();
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsepart() {
      var s0;

      s0 = peg$parseblock();
      if (s0 === null) {
        s0 = peg$parsevariable();
        if (s0 === null) {
          s0 = peg$parsetext();
        }
      }

      return s0;
    }

    function peg$parsetag_start() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseld();
      if (s1 !== null) {
        s2 = peg$parsetagname();
        if (s2 !== null) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
          if (s3 !== null) {
            s4 = peg$parsetagname();
            if (s4 !== null) {
              s5 = peg$parserd();
              if (s5 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c6(s2,s4);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c3;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c3;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c3;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c3;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c3;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }

      return s0;
    }

    function peg$parsetag_end() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseld();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 47) {
          s2 = peg$c7;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s2 !== null) {
          s3 = peg$parsetagname();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c4;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c5); }
            }
            if (s4 !== null) {
              s5 = peg$parsetagname();
              if (s5 !== null) {
                s6 = peg$parserd();
                if (s6 !== null) {
                  peg$reportedPos = s0;
                  s1 = peg$c6(s3,s5);
                  if (s1 === null) {
                    peg$currPos = s0;
                    s0 = s1;
                  } else {
                    s0 = s1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c3;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c3;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c3;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c3;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c3;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c3;
      }

      return s0;
    }

    function peg$parsetagname() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      if (peg$c10.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          if (peg$c10.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
        }
      } else {
        s1 = peg$c3;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c12(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }

      return s0;
    }

    function peg$parsetag() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseld();
      if (s1 !== null) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parserd();
        peg$silentFails--;
        if (s5 === null) {
          s4 = peg$c13;
        } else {
          peg$currPos = s4;
          s4 = peg$c3;
        }
        if (s4 !== null) {
          s5 = peg$currPos;
          peg$silentFails++;
          s6 = peg$parseeol();
          peg$silentFails--;
          if (s6 === null) {
            s5 = peg$c13;
          } else {
            peg$currPos = s5;
            s5 = peg$c3;
          }
          if (s5 !== null) {
            if (peg$c14.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c15); }
            }
            if (s6 !== null) {
              s4 = [s4, s5, s6];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c3;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c3;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c3;
        }
        if (s3 !== null) {
          while (s3 !== null) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parserd();
            peg$silentFails--;
            if (s5 === null) {
              s4 = peg$c13;
            } else {
              peg$currPos = s4;
              s4 = peg$c3;
            }
            if (s4 !== null) {
              s5 = peg$currPos;
              peg$silentFails++;
              s6 = peg$parseeol();
              peg$silentFails--;
              if (s6 === null) {
                s5 = peg$c13;
              } else {
                peg$currPos = s5;
                s5 = peg$c3;
              }
              if (s5 !== null) {
                if (peg$c14.test(input.charAt(peg$currPos))) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = null;
                  if (peg$silentFails === 0) { peg$fail(peg$c15); }
                }
                if (s6 !== null) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c3;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c3;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c3;
            }
          }
        } else {
          s2 = peg$c3;
        }
        if (s2 !== null) {
          s3 = peg$parserd();
          if (s3 !== null) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c3;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c3;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c3;
      }

      return s0;
    }

    function peg$parseld() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 123) {
        s0 = peg$c16;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }

      return s0;
    }

    function peg$parserd() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 125) {
        s0 = peg$c18;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }

      return s0;
    }

    function peg$parseeol() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 10) {
        s0 = peg$c20;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s0 === null) {
        if (input.substr(peg$currPos, 2) === peg$c22) {
          s0 = peg$c22;
          peg$currPos += 2;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s0 === null) {
          if (input.charCodeAt(peg$currPos) === 13) {
            s0 = peg$c24;
            peg$currPos++;
          } else {
            s0 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c25); }
          }
          if (s0 === null) {
            if (input.charCodeAt(peg$currPos) === 8232) {
              s0 = peg$c26;
              peg$currPos++;
            } else {
              s0 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c27); }
            }
            if (s0 === null) {
              if (input.charCodeAt(peg$currPos) === 8233) {
                s0 = peg$c28;
                peg$currPos++;
              } else {
                s0 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c29); }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsetext() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      s4 = peg$parsetag();
      peg$silentFails--;
      if (s4 === null) {
        s3 = peg$c13;
      } else {
        peg$currPos = s3;
        s3 = peg$c3;
      }
      if (s3 !== null) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c30); }
        }
        if (s4 !== null) {
          peg$reportedPos = s2;
          s3 = peg$c31(s4);
          if (s3 === null) {
            peg$currPos = s2;
            s2 = s3;
          } else {
            s2 = s3;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c3;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c3;
      }
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parsetag();
          peg$silentFails--;
          if (s4 === null) {
            s3 = peg$c13;
          } else {
            peg$currPos = s3;
            s3 = peg$c3;
          }
          if (s3 !== null) {
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c30); }
            }
            if (s4 !== null) {
              peg$reportedPos = s2;
              s3 = peg$c31(s4);
              if (s3 === null) {
                peg$currPos = s2;
                s2 = s3;
              } else {
                s2 = s3;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c3;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c3;
          }
        }
      } else {
        s1 = peg$c3;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c32(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsevariable() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseld();
      if (s1 !== null) {
        s2 = peg$parsetagname();
        if (s2 !== null) {
          s3 = peg$parserd();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c34(s2);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c3;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c3;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c3;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c33); }
      }

      return s0;
    }

    function peg$parseblock() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsetag_start();
      if (s1 !== null) {
        s2 = [];
        s3 = peg$parsepart();
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$parsepart();
        }
        if (s2 !== null) {
          s3 = peg$parsetag_end();
          if (s3 !== null) {
            peg$reportedPos = peg$currPos;
            s4 = peg$c35(s1,s2,s3);
            if (s4) {
              s4 = peg$c13;
            } else {
              s4 = peg$c3;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c36(s1,s2,s3);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c3;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c3;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c3;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c3;
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== null && peg$currPos === input.length) {
      return peg$result;
    } else {
      peg$cleanupExpected(peg$maxFailExpected);
      peg$reportedPos = Math.max(peg$currPos, peg$maxFailPos);

      throw new SyntaxError(
        peg$maxFailExpected,
        peg$reportedPos < input.length ? input.charAt(peg$reportedPos) : null,
        peg$reportedPos,
        peg$computePosDetails(peg$reportedPos).line,
        peg$computePosDetails(peg$reportedPos).column
      );
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse      : parse
  };
})();