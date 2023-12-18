import "./diet.css";
import cardBack from "../../images/Signup/background.png";
import { useEffect, useState } from "react";
import axios from "axios";
import NewPlan from "./newPlan";
export function Diet() {
  useEffect(() => {
    const getWeeks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/diet/weeks",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          setWeeks(data);
          console.log("week data", data);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    const getDayTime = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/diet/dayTime",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          setDayTime(data);
          console.log("dayTime data", data);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getWeeks();
    getDayTime();
  }, []);
  const [weeks, setWeeks] = useState([]);
  const [dayTime, setDayTime] = useState([]);
  const [diet, setDiet] = useState([]);
  const [choice, setChoice] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(-1);
  const [selectedDayTime, setSelectedDayTime] = useState(-1);
  const [selectedDiet, setselectedDiet] = useState();
  const [recip, setRecip] = useState([]);
  const [createNew, setCreateNew] = useState(1);

  const goBack = () => {
    if (choice > 1) {
      setChoice(choice - 1);
    } else {
      setChoice(1);
    }
  };

  const getDietPlans = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/diet/dietplan",
        {
          week: selectedWeek,
          daytime: selectedDayTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;

        setDiet(data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getRecip = async (diet) => {
    setselectedDiet(diet);
    try {
      const response = await axios.post(
        "http://localhost:3003/api/diet/recip",
        {
          diet: diet.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;

        setRecip(data);
        setChoice(4);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const dayTimeClick = async (dayTime) => {
    setSelectedDayTime(dayTime);
    await getDietPlans();
    setChoice(3);
  };

  const randomImage = cardBack;
  let plans = [
    {
      image: cardBack,
      details: "ABS AND CORE",
    },
  ];

  const invert = () => {
    if (createNew === 1) {
      setCreateNew(0);
    } else if (createNew === 0) {
      setCreateNew(1);
    }
  };

  return (
    <div className="diet_container">
      <h1 className="diet_title">Diets</h1>
      <div className="options" style={{ justifyContent: "flex-start" }}>
        <button className="button" onClick={invert}>
          {createNew === 1 ? "Close" : "Create Plan"}
        </button>
      </div>
      {createNew === 1 ? <NewPlan /> : <></>}

      <div className="diet_plan">
        If you’re a beginner bodybuilder and new to strength training and
        building lean muscle mass, one of the most important tools you’ll need
        to add muscle without fat is following a proper eating regime. Strength
        training is one of the single best things you can do for energy and
        longevity. But, if you’re not fueling your body correctly, your progress
        will be slow at best. It’s important that you eat approximately every 3
        to 4 hours to keep your metabolism evenly fueled throughout the day.
        This will help with muscle synthesis and fat burning. Aim for five to
        six meals daily to stay energetic and avoid that “hitting the wall”
        feeling by mid afternoon.
        <br />
        Your macronutrient intake (protein, carbs and fats) should look
        something like this:
        <br />
        <ul>
          <li>
            1 – 1.5 grams of protein per pound of bodyweight. Shoot for 25-30
            grams of protein (6-8 oz) at eat meal. Quality proteins like
            grass-fed beef, wild caught salmon, organic turkey and chicken,
            eggs, whey and casein protein powders, shrimp, cottage cheese and
            Greek yogurt are all great options.
          </li>
          <li>
            Keep your carbohydrate intake around 150 to 250 grams daily. Complex
            carbs like sweet potatoes/yams, brown rice, sprouted grain breads,
            oats, beans, quinoa, and whole grain pastas are all excellent
            choices. They fuel your body, digest slowly and will be utilized for
            energy.
          </li>
          <li>
            Simple carbs like fruit, white rice, white potatoes are good for
            post workout to aid in recovery and fast absorption for muscle
            growth.
          </li>
          <li>
            Fats should fall somewhere between 65 to 85 grams a day. Avocados,
            natural nut butters, coconut oil, extra virgin olive oil, and egg
            yolks are all healthy fats that should be part of your meal plan.
            Good fats give you energy and are utilized for fuel not storage.
          </li>
          <li>
            All vegetables aid in digestion and give quality fiber to keep your
            intestinal tract functioning smoothly.
          </li>
          <li>
            Consume at least half your bodyweight in water. Avoid sugary drinks
            and diet sodas.
          </li>
        </ul>
        <strong>Bottom line:</strong> If you want to build a muscular physique,
        you need to eat the proper diet. You can have a cheat meal once a week,
        but it shouldn’t be a cheat day or weekend. This will only derail your
        progress and leave you feeling sluggish.
        <h1>THE BEGINNER BODYBUILDER MEAL PLAN</h1>
        <div className="options" style={{ justifyContent: "flex-start" }}>
          <button className="button" onClick={goBack}>
            Back
          </button>
        </div>
        {choice === 1 ? (
          <div className="diet_plans">
            {weeks.map((plan, index) => {
              // return <Diet image={plan.c_image} details={plan.details} />;
              return (
                <div
                  className="diet_card"
                  key={index}
                  onClick={() => {
                    setSelectedWeek(plan.id);
                    setChoice(2);
                  }}
                >
                  <img className="diet_card_image" src={randomImage} />
                  <p className="diet_card_details">{plan.week}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {choice === 2 ? (
          <div className="diet_plans">
            {dayTime.map((plan, index) => {
              // return <Diet image={plan.c_image} details={plan.details} />;
              return (
                <div
                  className="diet_card"
                  key={index}
                  onClick={() => {
                    dayTimeClick(plan.id);
                  }}
                >
                  <img className="diet_card_image" src={randomImage} />
                  <p className="diet_card_details">{plan.dayTime}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {choice === 3 ? (
          <div className="diet_plans">
            {diet.map((plan, index) => {
              // return <Diet image={plan.c_image} details={plan.details} />;
              return (
                <div
                  className="diet_card"
                  key={index}
                  onClick={() => getRecip(plan)}
                >
                  <img className="diet_card_image" src={randomImage} />
                  <p className="diet_card_details">{plan.name}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {choice === 4 ? (
          <div>
            <h3>{selectedDiet.name}</h3>
            <ul>
              {recip.map((plan, index) => {
                // return <Diet image={plan.c_image} details={plan.details} />;
                return <li key={index}>{plan.recip}</li>;
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
        {/* <h3>WEEK 1</h3>
        <h5>BREAKFASTS</h5>
        <h5>Cereal with milk and berries:</h5>
        <ul>
          <li>1 cup of Whole Grain Cereal</li>
          <li>1% milk or almond milk</li>
          <li>1/2 cup berries</li>
        </ul>
        <h5>Scrambled egg wrap:</h5>
        <ul>
          <li>one whole egg</li>
          <li>3/4 egg whites</li>
          <li>1/4 cup lowfat cheese</li>
          <li>spinach, tomato wrapped in a low carb tortilla</li>
          <li>1/4 cup salsa if desired</li>
        </ul>
        <h5>Veggie omelet</h5>
        <ul>
          <li>Saute bell peppers, tomatoes, onions until soft. Set aside</li>
          <li>
            Make omelet with one whole egg and 5 egg whites, then add cooked
            veggies
          </li>
          <li>Pair with ¼ cup lowfat cheese</li>
          <li>2 pieces of whole grain sprouted bread</li>
        </ul>
        <h5>SNACKS Bread and almond butter</h5>
        <ul>
          <li>3 slices of cinnamon raisin Ezekiel bread</li>
          <li>1 tbsp almond butter</li>
          <li>1 tbsp natural strawberry jam</li>
        </ul>
        <h5>Cereal, milk and fruit</h5>
        <ul>
          <li>1 cup whole grain cereal</li>
          <li>With a cup of 1% milk</li>
          <li>1 cup strawberries</li>
        </ul>
        <h5>Chocolate protein pudding</h5>
        <ul>
          <li>1 ½ scoops of whey/casein blend</li>
          <li>Add water and stir until cake batter consistency</li>
          <li>Microwave for a minute, stir and eat</li>
          <li>Add in ¼ cup crushed almonds or walnuts</li>
        </ul>
        <h5> Oatmeal nut butter snack</h5>
        <ul>
          <li>1 cup of oatmeal</li>
          <li>1 scoop of whey protein any flavor</li>
          <li>1 Tbsp of natural almond butter</li>
          <li>
            Mix all together with water and cook according to package directions
          </li>
        </ul>
        <h5>Cottage cheese and muffin</h5>
        <ul>
          <li>1 sprouted grain English muffin (any flavor), toasted</li>
          <li>Pair with ¾ cup of cottage cheese no salt added</li>
          <li>¾ cup of pineapple</li>
        </ul>
        <h5>Yogurt parfait</h5>
        <ul>
          <li>8 oz of nonfat Greek yogurt</li>
          <li>¼ cup of chopped walnuts or almonds</li>
          <li>¼ cup of dried cranberries</li>
          <li>½ medium apple</li>
        </ul>
        <h5>LUNCHES Salmon and greens</h5>
        <ul>
          <li>
            4-5 oz of grilled salmon over a large salad with a variety of
            vegetables
          </li>
          <li>Pair with 2-3 organic brown rice cakes</li>
        </ul>
        <h5>Tuna wrap</h5>
        <ul>
          <li>1 can of tuna</li>
          <li>1 Tbsp of fat free mayo</li>
          <li>1 tbsp of dijon mustard</li>
          <li>1 cup of chopped celery/onion</li>
          <li>1 organic tortilla wrap</li>
          <li>1 cup of romaine lettuce</li>
        </ul>
        <h5>Grilled chicken salad</h5>
        <ul>
          <li>5-6 oz chicken breast</li>
          <li>Salad with 1 Tbsp balsamic vinegar</li>
          <li>2 Tbsp avocado</li>
          <li>2 slices of Ezekiel toast</li>
        </ul>
        <h5>DINNERS Pork and applesauce</h5>
        <ul>
          <li>5-6 oz lean pork</li>
          <li>1/2 cup unsweetened apple sauce</li>
          <li>10-12 asparagus spears</li>
          <li>5 oz of sweet potato or yams</li>
        </ul>
        <h5>Salmon and String Beans</h5>
        <ul>
          <li>5-6 oz grilled salmon</li>
          <li>2 cups green string beans</li>
          <li>5-6 oz of red potatoes</li>
        </ul>
        <h5>Steak and spinach</h5>
        <ul>
          <li>6 oz of grass-fed flank steak</li>
          <li>2-3 cups baby spinach sautéed with</li>
          <li>1 tbsp of olive oil, sea salt, garlic & pepper to taste</li>
          <li>5 oz of sweet potato</li>
        </ul>
        <h3>WEEK 2</h3>
        <h5>BREAKFASTS</h5>
        <h5>Ham, egg and cheese</h5>
        <ul>
          <li>1 whole grain English muffin</li>
          <li>2 whole eggs</li>
          <li>2 pieces of organic nitrate-free ham</li>
          <li>1/4 low fat cheese</li>
          <li>1/2 cup fruit</li>
        </ul>
        <h5>Blueberry oatmeal</h5>
        <ul>
          <li>1/2 – 1 cup oatmeal with water</li>
          <li>8 oz nonfat Greek yogurt stirred in</li>
          <li>1/2 cup blueberries, cinnamon to taste</li>
        </ul>
        <h5>Protein fruit smoothie</h5>
        <ul>
          <li>Vanilla whey powder</li>
          <li>1 small banana</li>
          <li>½ cup strawberries</li>
          <li>Toss in blender with almond milk and ice</li>
        </ul>
        <h5>SNACKS Rice cakes and guac</h5>
        <ul>
          <li>3-4 organic brown rice cakes</li>
          <li>1/4 cup of guacamole</li>
          <li>½ cup of nonfat 1% cottage cheese</li>
        </ul>
        <h5>Eggs on toast</h5>
        <ul>
          <li>2 whole hardboiled eggs / 4 hardboiled whites</li>
          <li>2 slices of sprouted grain toast</li>
          <li>1-2 tbsp of organic strawberry jam</li>
        </ul>
        <h5>Apple and nut butter</h5>
        <ul>
          <li>1 medium apple</li>
          <li>1 tbsp natural nut butter</li>
        </ul>
        <h5>Chocolate protein drink</h5>
        <ul>
          <li>1 scoop of chocolate Whey protein powder</li>
          <li>Combine in a blender with almond milk and ice</li>
          <li>Add 1/2 Tbsp of coconut oil</li>
        </ul>
        <h5>Yogurt parfait</h5>
        <ul>
          <li>8oz nonfat plain Greek yogurt</li>
          <li>1/2 cup fruit</li>
          <li>1/4 cup chopped walnuts</li>
        </ul>
        <h5>Fruit and nuts</h5>
        <ul>
          <li>1 medium orange</li>
          <li>12 toasted almonds</li>
          <li>3/4 cup 1% cottage cheese no sodium</li>
        </ul>
        <h5>LUNCHES Ground turkey salad</h5>
        <ul>
          <li>5 oz of lean ground turkey over</li>
          <li>Salad with 1/2 small avocado chopped</li>
          <li>2 slices of organic lean turkey bacon</li>
          <li>Pair with low sodium salsa</li>
          <li>15 baked tortilla chips</li>
        </ul>
        <h5>Bison burger</h5>
        <ul>
          <li>5 oz bison burger organic</li>
          <li>1 whole grain sprouted bun</li>
          <li>Add slices of lettuce and tomato</li>
          <li>1 slice lowfat cheese</li>
          <li>1 Tbsp mustard</li>
        </ul>
        <h5>Salmon and brown rice</h5>
        <ul>
          <li>5 oz grilled salmon</li>
          <li>1 cup of brown rice</li>
          <li>2 cups of steamed broccoli</li>
        </ul>
        <h5>DINNERS Shrimp stir-fry</h5>
        <ul>
          <li>6-8 oz shrimp</li>
          <li>2 cups mixed vegetables for stir-fry</li>
          <li>Cook all in 1 Tbsp of olive oil</li>
          <li>Served over 1 cup of brown rice</li>
        </ul>
        <h5>Fish and veggies</h5>
        <ul>
          <li>6-8 oz of white fish (cod, halibut)</li>
          <li>2 cups of kale cooked in 1 tbsp of coconut oil</li>
          <li>1 cup of long grain wild rice</li>
        </ul>
        <h5>Steak and potatoes</h5>
        <ul>
          <li>6-8 oz grilled flank steak</li>
          <li>2-3 cups of spinach sautéed in</li>
          <li>1 Tbsp of olive oil w sea salt and garlic</li>
          <li>1 medium baked potato</li>
        </ul> */}
      </div>
    </div>
  );
}

export function DietCard(props) {
  const { image, details } = props;
  return (
    <div className="diet_card">
      <img className="diet_card_image" src={image} />
      <p>{details}</p>
    </div>
  );
}

export default Diet;
