import FoodItem from "../FoodItem";

const FoodGallery = ({
                          food = [{
                              name: "Curry Pizza",
                              type: "Pizza",
                              poster_path: "https://currypizzahouse.com/"
                          }], posterOnClickHandler, addFoodOnClickHandler, refresh, allowLike=false
                      }) => {
    return (
        <div className={"row row-cols-2 row-cols-md-5 g-3"}>
            {
                food && food.map((food, nth) =>
                <FoodItem key={nth} food={food} posterOnClickHandler={posterOnClickHandler}
                           addFoodOnClickHandler={addFoodOnClickHandler} refresh={refresh} allowLike={allowLike}/>
                )
            }
        </div>
    )
};
export default FoodGallery;