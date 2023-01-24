// Climb the political ladder
{
    canTriggerIfUnavailable: true,
    checkType: 'householdCharacters',
    checkAndAct(characterId) {
      let state = daapi.getState()
      let character = state.characters[characterId]
      if (
        character &&
        !character.isDead &&
        (character.spouseId === null ||
        !state.characters[character.spouseId] ||
        state.characters[character.spouseId].isDead) &&
        age >= 16
      ) {
        daapi.addCharacterAction({
          characterId,
          key: 'political_ladder',
          action: {
            title: 'Political Ladder',
            icon: daapi.requireImage('/political_ladder/political-ladder.svg'),
            isAvailable: true,
            hideWhenBusy: false,
            process: {
              event: '/politica_ladder/main',
              method: 'process',
              context: {
                characterId
              }
            }
          }
        })
      } else {
        daapi.deleteCharacterAction({
          characterId,
          key: 'political_ladder'
        })
      }
    },
    methods: {
      process({ characterId }) {
        let character = daapi.getCharacter({ characterId })
        if(influence > 800){
          daapi.pushInteractionModalQueue({
            title: 'Political Ladder',
            message: 'As the election for the Senate of the Roman Empire approaches, factions are trying to figure out which candidate will be the most suitable. In light of your conservative beliefs and strong opposition to political reform, the Conservative Alliance has invited you to join their faction.',
            image: daapi.requireImage('/political_ladder/political-ladder.svg'),
            options: [
              {
                variant: 'danger',
                text: 'Yes!!!',
                tooltip: 'This action cannot be undone',
                statChanges: {
                  cash: +1000,
                  prestige: +500,
                  influence: +500,
                  scaleByRevenue: ['cash']
                },
                action:{
                  event: '/political_ladder/main',
                  method: 'doPolitics',
                  context: {characterId}
                }
              },
              {
                text: 'No way!'
              }
            ]
          })
        }
        if(prestige > 700 && influence > 700){
          daapi.pushInteractionModalQueue({
            title: 'Political Ladder',
            message: 'As the election for the Senate of the Roman Empire approaches, factions are trying to figure out which candidate will be the most suitable. You have been invited to join the People'+'s Front faction as a result of your charismatic nature and strong popularity among the common people.',
            image: daapi.requireImage('/political_ladder/political-ladder.svg'),
            options: [
              {
                variant: 'danger',
                text: 'Yes!!!',
                tooltip: 'This action cannot be undone',
                statChanges: {
                  cash: +1000,
                  prestige: +500,
                  influence: +500,
                  scaleByRevenue: ['cash']
                },
                action:{
                  event: '/political_ladder/main',
                  method: 'doPolitics',
                  context: {characterId}
                }
              },
              {
                text: 'No way!'
              }
            ]
          })
        }
      },
      doDivorce({ characterId, spouseId }) {
        daapi.updateCharacter({
          flagCanHoldImperium: true,
        })
      }
    }
  }