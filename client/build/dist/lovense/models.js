export var Model;
(function(Model2) {
  Model2["Nora"] = "Nora";
  Model2["Max"] = "Max";
  Model2["Lush"] = "Lush";
  Model2["Hush"] = "Hush";
  Model2["Domi"] = "Domi";
  Model2["Edge"] = "Edge";
  Model2["Osci"] = "Osci";
  Model2["Quake"] = "Quake";
})(Model || (Model = {}));
export const Nora = Model.Nora;
export const Max = Model.Max;
export const Lush = Model.Lush;
export const Hush = Model.Hush;
export const Domi = Model.Domi;
export const Edge = Model.Edge;
export const Osci = Model.Osci;
export const Quake = Model.Quake;
export const modelCapabilities = new Map([
  [
    Nora,
    {
      vibration: true,
      rotation: true
    }
  ],
  [
    Lush,
    {
      vibration: true,
      patterns: 4
    }
  ],
  [
    Hush,
    {
      vibration: true
    }
  ],
  [
    Quake,
    {
      vibration: true,
      patterns: void 0
    }
  ],
  [
    Domi,
    {
      vibration: true,
      levels: 3,
      patterns: 10
    }
  ]
]);
export const modelsById = new Map([
  ["A", Nora],
  ["C", Nora],
  ["B", Max],
  ["S", Lush],
  ["Z", Hush],
  ["W", Domi],
  ["P", Edge],
  ["O", Osci],
  ["J", Quake]
]);
