document.getElementById("teamSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("teamInput").value;
    if (value === "")
      return;

    // Get the type, height, weight, abilities, name, stats, and sprite from the initial call
    // Potentially do a loop and show descriptions of moves/abilities
    // Do a third call to get locations to find said pokemon (look at docs)
    let name = value.toLowerCase()
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let abilitiesList = []
        let abilitiesDesc = []
        let typesList = []
        let movetypeList = []
        let doublefrom = []
        let doubleto = []
        let halffrom = []
        let halfto = []
        let nofrom = []
        let noto = []
        
        let name = json.name
        let height = json.height
        let weight = json.weight
        let type = json.types
        let stats = json.stats
        var sprite = json['sprites']
          sprite = sprite['front_default']

        var results = '';

          for (let i = 0; i < (json.types.length); i++)
          {
            let t = type[i]
            t = t['type']
            t = t['name']
            typesList.push(t)
          }

        for (let i = 0; i < json.abilities.length; i++)
        {
          let a = json.abilities[i]
          a = a.ability
          let name = a.name
          abilitiesList.push(name)
        }

        for (let x = 0; x < abilitiesList.length; x++)
        {
          let url = "https://pokeapi.co/api/v2/ability/" + abilitiesList[x];
          fetch(url)
            .then(function(response) {
              return response.json();
            }).then(function(json) {
              let effect = json.effect_entries[1]
              effect = effect['effect']
              abilitiesDesc.push(effect)
            });
        }
      

        var lengthcheck = json.types.length-1

        for (let x = 0; x < json.types.length; x++)
        {
          let url = "https://pokeapi.co/api/v2/type/" + typesList[x];
          fetch(url)
            .then(function(response) {
              return response.json();
            }).then(function(json) {

              let movetype = json.move_damage_class
              movetype = movetype['name']
              movetypeList.push(movetype)

              let damage_relations = json.damage_relations
                let double_damage_from = damage_relations.double_damage_from
                  for(let i = 0; i < double_damage_from.length; i++){
                    let d = double_damage_from[i]
                    d = d['name']
                    doublefrom.push(d)
                  }

                let double_damage_to = damage_relations.double_damage_to
                  for(let i = 0; i < double_damage_to.length; i++){
                    let d = double_damage_to[i]
                    d = d['name']
                    doubleto.push(d)
                  }

                let half_damage_from = damage_relations.half_damage_from
                  for(let i = 0; i < half_damage_from.length; i++){
                    let d = half_damage_from[i]
                    d = d['name']
                    halffrom.push(d)
                  }

                let half_damage_to = damage_relations.half_damage_to
                  for(let i = 0; i < half_damage_to.length; i++){
                    let d = half_damage_to[i]
                    d = d['name']
                    halfto.push(d)
                  }

                let no_damage_to = damage_relations.no_damage_to
                  for(let i = 0; i < no_damage_to.length; i++){
                    let d = no_damage_to[i]
                    d = d['name']
                    noto.push(d)
                  }

                let no_damage_from = damage_relations.no_damage_from
                  for(let i = 0; i < no_damage_from.length; i++){
                    let d = no_damage_from[i]
                    d = d['name']
                    nofrom.push(d)
                  }

                  // Wrap a div around everything and make it 80% width
                  //Make a banner thing for where you initially input the information
                  // Work on the sprite
                  // Div the three different sections
                  // Center everything
                  // work on width of ability descriptions (wrap)
                  // Footer
                  // Background color
                  if (x === lengthcheck)
                  {
                    results += "<div class='resultsContainer'>"

                    results += "<div class='sprite'> <img src='" + sprite + "'> </div> <br>"


                    results += "<h3>Pokemon</h3>"
                    results += '<p>Name: ' + name + "</p>";
                    results += '<p>Height: ' + height + " Weight: " + weight + "</p>"
                    
                    results += "<p> Type: "
                    for (let i = 0; i < (typesList.length); i++)
                    {
                      results += typesList[i] + " "
                    }
                    
                    results+= "<h3>Type Matchups</h3>"
                    
                    if (doubleto.length > 0)
                    {
                      results += "<p>Double Damage to: "
                      for (let i = 0; i < (doubleto.length); i++)
                      {
                        results += doubleto[i] + " "
                      }
                      results += "</p>"
                    }
                    

                    if (doublefrom.length > 0 )
                    {
                      results += "<p>Double Damage from: "
                      for (let i = 0; i < (doublefrom.length); i++)
                      {
                        results += doublefrom[i] + " "
                      }
                      results += "</p>"
                    }
                    

                    if (halfto.length > 0)
                    {
                      results += "<p>Half Damage to: "
                    for (let i = 0; i < (halfto.length); i++)
                    {
                      results += halfto[i] + " "
                    }
                    results += "</p>"
                    }
                    
                    if (halffrom.length > 0)
                    {
                      results += "<p>Half Damage from: "
                    for (let i = 0; i < (halffrom.length); i++)
                    {
                      results += halffrom[i] + " "
                    }
                    results += "</p>"
                    }
                    

                    if (noto.length > 0)
                    {
                      results += "<p>No Damage to: "
                      for (let i = 0; i < (noto.length); i++)
                      {
                        results += noto[i] + " "
                      }
                      results += "</p>"
                    }

                    if (nofrom.length > 0)
                    {
                      results += "<p>No Damage from: "
                      for (let i = 0; i < (doubleto.length); i++)
                      {
                        results += nofrom[i] + " "
                      }
                      results += "</p>"
                  }

          


                  results += "<div class='myab'> <h3>Potential Abilities: </h3>"
                  
                  for (let i = 0; i < (abilitiesList.length); i++)
                  {
                    results += "<p> <b>" + abilitiesList[i] + "</b>: " + abilitiesDesc[i];
                  }

                  results += "</div>"

                  results += "</div>"
                  document.getElementById("teamResults").innerHTML = results;
                  }


                  

            });
        }

        var now = new Date().getTime();
        while ( new Date().getTime() < now + 500 )
          {

          }



      });
  });