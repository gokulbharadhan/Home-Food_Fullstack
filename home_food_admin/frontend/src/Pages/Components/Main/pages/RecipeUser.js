
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { InputAdornment } from '@mui/material';
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@mui/material";
import axios from "../../../../api/axios";

const URL = './food';

const RecipeUser = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setRecipes('');
      } else {
        setRecipes(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };

  const handleView = (recipe) => {
    console.log(recipe.id);
    navigate('/RecipeDetails', { state: { id: recipe.id, food_item: recipe.food_item, price: recipe.price, category_id: recipe.category_id } });
  };

  // Filter the recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.food_item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>Recipes</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe_area plus_padding">
        <div className="container" style={{marginTop: "40px", marginBottom: "80px" }}>
          
          {/* Search Bar */}
          <div style={{ textAlign:'center', marginBottom: '70px' }}>
  <TextField
    variant="outlined"
    label="Search Recipes"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} 
    sx={{ width: '400px' ,height:'40px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px', 
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    }}
  />
</div>
          <div className="row">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="col-xl-4 col-lg-4 col-md-6">
                <div className="single_recipe text-center">
                  <div className="recipe_thumb">
                    <img
                      src={`http://localhost:3006${recipe.image}`}
                      alt=""
                      style={{ width: '55%', height: '75%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3>{recipe.food_item}</h3>
                  <span>{recipe.food_type}</span>
                  <p>Price: ₹ {recipe.price}</p>
                  <Button className="line_btn" onClick={() => handleView(recipe)}>
                    View Full Recipe
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RecipeUser;
