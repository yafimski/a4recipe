import { defUnit } from "./helpers";

export const allPossibleIngredients = [
  "All-purpose flour",
  "Almond butter",
  "Almond flour",
  "Almond milk",
  "Apples",
  "Artichoke",
  "Asparagus",
  "Avocado",
  "Bacon",
  "Baguette",
  "Baking powder",
  "Baking soda",
  "Banana",
  "Barley",
  "Basil",
  "Bay leaves",
  "Beans",
  "Bean sprouts",
  "Beets",
  "Black beans",
  "Black-eyed peas",
  "Black olives",
  "Black pepper",
  "Blueberries",
  "Bread",
  "Bread buns",
  "Bread crumbs",
  "Bread flour",
  "Broccoli",
  "Brown butter",
  "Brown lentils",
  "Brown rice",
  "Brown sugar",
  "Brussels sprouts",
  "Butter",
  "Buttermilk",
  "Cabbage",
  "Cake flour",
  "Candied ginger",
  "Carrots",
  "Cashew nuts",
  "Cauliflower",
  "Celery",
  "Cheddar cheese",
  "Cherries",
  "Chia seeds",
  "Chicken breasts",
  "Chicken broth",
  "Chickpeas",
  "Chili powder",
  "Chives",
  "Cilantro",
  "Cinnamon",
  "Cloves",
  "Cocoa nibs",
  "Cocoa powder",
  "Coconut flakes",
  "Coconut milk",
  "Coconut oil",
  "Condensed milk",
  "Cornmeal",
  "Cornstarch",
  "Corn syrup",
  "Couscous",
  "Cranberries",
  "Cream cheese",
  "Cumin",
  "Dark chocolate",
  "Dill",
  "Eggs",
  "Eggwhite",
  "Fennel",
  "Feta cheese",
  "Fish sauce",
  "Garlic",
  "Gelatin",
  "Ginger",
  "Goat cheese",
  "Grapes",
  "Graham crackers",
  "Greek yogurt",
  "Green beans",
  "Green lentils",
  "Green olives",
  "Ground beef",
  "Ham",
  "Hazelnuts",
  "Heavy cream",
  "Honey",
  "Hot sauce",
  "Kale",
  "Ketchup",
  "Leek",
  "Lemon",
  "Lemon juice",
  "Lemon zest",
  "Lentils",
  "Lima beans",
  "Lime",
  "Macadamia nuts",
  "Maple syrup",
  "Marzipan",
  "Mayonnaise",
  "Milk",
  "Molasses",
  "Mozzarella cheese",
  "Mung beans",
  "Mushrooms",
  "Mustard",
  "Nutmeg",
  "Oats",
  "Olive oil",
  "Onion",
  "Orange",
  "Oregano",
  "Paprika",
  "Parmesan cheese",
  "Parsley",
  "Pasta",
  "Peas",
  "Pecan flour",
  "Pecans",
  "Pecorino cheese",
  "Pineapple",
  "Pine nuts",
  "Pomegranate seeds",
  "Poppy seeds",
  "Pork chop",
  "Potatoes",
  "Powdered sugar",
  "Quinoa",
  "Raisins",
  "Raspberries",
  "Red bell pepper",
  "Red cabbage",
  "Red lentils",
  "Red pepper flakes",
  "Red wine vinegar",
  "Rice",
  "Ricotta cheese",
  "Rosemary",
  "Salmon",
  "Salt",
  "Sausage",
  "Seasoning",
  "Shallots",
  "Shortening",
  "Sliced bread",
  "Sour cream",
  "Soy sauce",
  "Spinach",
  "Sugar",
  "Sunflower oil",
  "Swiss cheese",
  "Tahini",
  "Thyme",
  "Tomato paste",
  "Tomato sauce",
  "Turkey",
  "Vanilla bean",
  "Vanilla extract",
  "Vanilla sugar",
  "Vegetable oil",
  "Vinegar",
  "Water",
  "Walnuts",
  "White chocolate",
  "Whole wheat flour",
  "Yeast",
  "Yellow bell pepper",
  "Yogurt",
  "Yolk",
  "Zucchini",
];

export const commonUnits = [
  "mg",
  "g",
  "kg",
  "ml",
  "liter",
  "whole",
  "quart",
  "pint",
  "lbs",
  "oz",
  "tsp",
  "tbsp",
  "cup",
  "can",
];

export const extraUnits = [
  defUnit,
  "gallon",
  "piece",
  "slice",
  "strip",
  "drop",
  "dash",
  "smidgen",
  "bunch",
  "jar",
  "stick",
  "clove",
  "head",
  "fillet",
  "block",
  "sheet",
  "pack",
  "packet",
  "bag",
  "bar",
  "cube",
  "handful",
  "bottle",
  "sprig",
  "stalk",
  "ear",
  "bowl",
  "scoop",
  "dozen",
  "pinch",
];

export const allPossibleChefActions = [
  { actionName: "Add", time: -1, unit: "min", equipment: "hand" },
  { actionName: "Bake", time: 20, unit: "min", equipment: "oven" },
  { actionName: "Blanch", time: 1, unit: "min", equipment: "stove" },
  { actionName: "Blend", time: -1, unit: "min", equipment: "blender" },
  { actionName: "Boil", time: 5, unit: "min", equipment: "stove" },
  { actionName: "Braise", time: 10, unit: "min", equipment: "oven" },
  { actionName: "Broil", time: 20, unit: "min", equipment: "broiler" },
  { actionName: "Chill", time: 5, unit: "min", equipment: "hand" },
  { actionName: "Chop", time: -1, unit: "min", equipment: "knife" },
  { actionName: "Core", time: -1, unit: "min", equipment: "corer" },
  { actionName: "Cure", time: 5, unit: "hours", equipment: "refrigerator" },
  { actionName: "Dice", time: -1, unit: "min", equipment: "knife" },
  { actionName: "Dress", time: -1, unit: "min", equipment: "none" },
  { actionName: "Emulsify", time: -1, unit: "min", equipment: "blender" },
  { actionName: "Fold", time: -1, unit: "min", equipment: "spatula" },
  { actionName: "Ferment", time: 24, unit: "hours", equipment: "refrigerator" },
  { actionName: "Fry", time: 5, unit: "min", equipment: "stove" },
  { actionName: "Garnish", time: -1, unit: "min", equipment: "none" },
  { actionName: "Glaze", time: -1, unit: "min", equipment: "brush" },
  { actionName: "Grate", time: -1, unit: "min", equipment: "grater" },
  { actionName: "Grill", time: 20, unit: "min", equipment: "grill" },
  { actionName: "Infuse", time: -1, unit: "min", equipment: "stove" },
  { actionName: "Knead", time: 10, unit: "min", equipment: "stand mixer" },
  { actionName: "Marinate", time: 8, unit: "hours", equipment: "refrigerator" },
  { actionName: "Mince", time: -1, unit: "min", equipment: "knife" },
  { actionName: "Mix", time: -1, unit: "min", equipment: "bowl" },
  { actionName: "Peel", time: -1, unit: "min", equipment: "peeler" },
  { actionName: "Poach", time: 8, unit: "min", equipment: "stove" },
  { actionName: "Purée", time: -1, unit: "min", equipment: "food processor" },
  { actionName: "Roast", time: 20, unit: "min", equipment: "oven" },
  { actionName: "Sauté", time: 5, unit: "min", equipment: "stove" },
  { actionName: "Score", time: -1, unit: "min", equipment: "knife" },
  { actionName: "Sear", time: 2, unit: "min", equipment: "stove" },
  { actionName: "Season", time: -1, unit: "min", equipment: "none" },
  { actionName: "Shred", time: -1, unit: "min", equipment: "grater" },
  { actionName: "Sieve", time: -1, unit: "min", equipment: "sieve" },
  { actionName: "Simmer", time: 30, unit: "min", equipment: "stove" },
  { actionName: "Slice", time: -1, unit: "min", equipment: "knife" },
  { actionName: "Smoke", time: 2, unit: "hours", equipment: "smoker" },
  { actionName: "Steam", time: 10, unit: "min", equipment: "steamer" },
  { actionName: "Stew", time: 45, unit: "min", equipment: "slow cooker" },
  { actionName: "Strain", time: -1, unit: "min", equipment: "strainer" },
  { actionName: "Toast", time: 2, unit: "min", equipment: "toaster" },
  { actionName: "Trim", time: -1, unit: "min", equipment: "knife" },
  { actionName: "Warm", time: 5, unit: "min", equipment: "hand" },
  { actionName: "Whisk", time: 5, unit: "min", equipment: "hand mixer" },
];
