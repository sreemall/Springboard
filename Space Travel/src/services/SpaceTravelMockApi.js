import {nanoid} from "nanoid";

class SpaceTravelMockApi
{
  static MOCK_DB = {
    planets: [
      {
        id: 0,
        name: "Mercury",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Reprocessed_Mariner_10_image_of_Mercury.jpg"

      },
      {
        id: 1,
        name: "Venus",
        currentPopulation: 0,
        pictureUrl: "https://media.wired.com/photos/5e59ad2b79c7100008eb6ae8/1:1/w_2000,h_2000,c_limit/photo_space_venus_1_S91-50688.jpg"

      },
      {
        id: 2,
        name: "Earth",
        currentPopulation: 100000,
        pictureUrl: "https://thumbs.dreamstime.com/b/realistic-earth-high-quality-render-planet-isolated-black-background-40044176.jpg"

      },
      {
        id: 3,
        name: "Mars",
        currentPopulation: 0,
        pictureUrl: "https://space-facts.com/wp-content/uploads/mars-v2.jpg"
      },
      {
        id: 4,
        name: "Jupiter",
        currentPopulation: 0,
        pictureUrl: "https://cdn.esahubble.org/archives/images/screen/heic1914a.jpg"

      },
      {
        id: 5,
        name: "Saturn",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/8423_20181_1saturn2016.jpg/1920px-8423_20181_1saturn2016.jpg"
      },
      {
        id: 6,
        name: "Uranus",
        currentPopulation: 0,
        pictureUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYR5IAZlq2GJaTnf9L8MaSMJUFz-hDUNjnKVZYsQLww&s"
      },
      {
        id: 7,
        name: "Neptune",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Neptune.jpg"
      }
    ],
    spacecrafts: [
      {
        id: "prispax",
        name: "Prispax",
        capacity: 10000,
        description: "Presenting the Astrolux Odyssey: a revolutionary spacecraft merging cutting-edge technology with lavish luxury, designed to usher 10,000 passengers into the solar system's embrace. A marvel of engineering, its sleek exterior is adorned with solar panels, fueling advanced propulsion while minimizing environmental impact." +
                     "Within, the vessel transforms into a haven of opulence. Lavish suites offer cosmic panoramas, celestial artwork bedecks lounges, and sprawling gardens thrive in zero-gravity. Culinary excellence reigns in gourmet restaurants, while immersive theaters and VR chambers offer stellar entertainment." +
                     "Safety remains paramount with cosmic radiation shielding and top-tier medical facilities. The Astrolux Odyssey not only advances space exploration but redefines elegance, uniting humanity's thirst for knowledge with a taste of the sublime.",
        pictureUrl: null,
        currentLocation: 2
      }
    ]
  };
  static MOCK_DB_KEY = "MOCK_DB";

  static prepareResponse ()
  {
    return {
      isError: false,
      data: null
    };
  }

  static wait (duration = 1000)
  {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  static getMockDb ()
  {
    let mockDb = localStorage.getItem(SpaceTravelMockApi.MOCK_DB_KEY);

    if (!mockDb)
    {
      localStorage.setItem(SpaceTravelMockApi.MOCK_DB_KEY, JSON.stringify(SpaceTravelMockApi.MOCK_DB));
      mockDb = SpaceTravelMockApi.MOCK_DB;
    }
    else
    {
      mockDb = JSON.parse(mockDb);
    }

    return mockDb;
  }

  static setMockDb (mockDb)
  {
    localStorage.setItem(SpaceTravelMockApi.MOCK_DB_KEY, JSON.stringify(mockDb));
  }

  static async getPlanets ()
  {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try
    {
      const mockDb = SpaceTravelMockApi.getMockDb();
      response.data = mockDb.planets;
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async getSpacecrafts ()
  {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try
    {
      const mockDb = SpaceTravelMockApi.getMockDb();
      response.data = mockDb.spacecrafts;
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async getSpacecraftById ({id})
  {

    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try
    {
      const mockDb = SpaceTravelMockApi.getMockDb();

      for (let i = 0; i < mockDb.spacecrafts.length; i++)
      {
        const spacecraft = mockDb.spacecrafts[i];
        if (spacecraft.id === id)
        {
          response.data = spacecraft;
          break;
        }
      }
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async buildSpacecraft ({name, capacity, description, pictureUrl = undefined})
  {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try
    {
      const spacecraft = {id: nanoid(), name, capacity, description, pictureUrl, currentLocation: 2};

      const mockDb = SpaceTravelMockApi.getMockDb();
      mockDb.spacecrafts.push(spacecraft);
      SpaceTravelMockApi.setMockDb(mockDb);
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async destroySpacecraftById ({id})
  {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try
    {
      const mockDb = SpaceTravelMockApi.getMockDb();

      for (let i = 0; i < mockDb.spacecrafts.length; i++)
      {
        const spacecraft = mockDb.spacecrafts[i];

        if (spacecraft.id === id)
        {
          mockDb.spacecrafts.splice(i, 1);
          SpaceTravelMockApi.setMockDb(mockDb);
        }
      }
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async sendSpacecraftToPlanet ({spacecraftId, targetPlanetId})
  {
   
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try
    {
      const mockDb = SpaceTravelMockApi.getMockDb();

      for (let i = 0; i < mockDb.spacecrafts.length; i++)
      {
        const spacecraft = mockDb.spacecrafts[i];

        if (spacecraft.id === spacecraftId)
        {
          if (spacecraft.currentLocation === targetPlanetId)
          {
            throw new Error("The spacecraft is already on this planet!");
          }

          let transferredCapacity = Number(spacecraft.capacity);

          for (const planet of mockDb.planets)
          {
            if (planet.id === spacecraft.currentLocation)
            {
              if (planet.currentPopulation < transferredCapacity)
              {
                transferredCapacity = Number(planet.currentPopulation);
              }

              planet.currentPopulation -= transferredCapacity;
            }
          }

          for (const planet of mockDb.planets)
          {
            if (planet.id === targetPlanetId)
            {
              // planet.currentPopulation += transferredCapacity;
              planet.currentPopulation = Number(planet.currentPopulation) + transferredCapacity;
            }
          }

          spacecraft.currentLocation = targetPlanetId;
          SpaceTravelMockApi.setMockDb(mockDb);
          
        }
      }
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }
}

export default SpaceTravelMockApi;
