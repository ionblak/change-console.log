const consoleLog = [];
//save original conlole.log
const oldConsoleLog = console.log;

console.log = function(...args) {
      oldConsoleLog(...args);
      const stringifiedArgs = args
        .map((arg) => {
          if (typeof arg === "string") {
            return arg.trim();
          }
          try {
            return JSON.stringify(arg);
          } catch (err) {
            // There is some kind of circular dependency in the `arg` object
            // let's log at least "shape" of the object
            const oneLevelArg = {};
            for (const [key, value] of Object.entries(arg)) {
              if (typeof value === "function") {
                oneLevelArg[key] = "[Function]";
                continue;
              }
              if (value && typeof value === "object") {
                oneLevelArg[key] = "[Object]";
                continue;
              }
              oneLevelArg[key] = value;
            }
            return JSON.stringify(oneLevelArg);
          }
        })
        .join(" ");
      consoleLog.push(stringifiedArgs);
    };
//back to original console.log
console.log = oldConsoleLog;