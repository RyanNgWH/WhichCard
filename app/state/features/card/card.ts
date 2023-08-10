// Define an interface for database card data.
export interface DbCard {
  issuer: string,   // Holds the issuer name of the card.
  type: string      // Holds the type of the card.
}

// Define an interface for card data used in the app.
export interface Card {
  cardName: string,           // Holds the name of the card.
  card: {
    _id: string,              // Holds the unique identifier of the card.
    type: string,             // Holds the type of the card.
    issuer: string            // Holds the issuer name of the card.
  }
}

// Function to retrieve the logo source for a card issuer.
function getCardIssuerLogo(issuer: string) {
    let logoSrc;                // Variable to store the logo source.
    switch (issuer) {
        case 'ocbc':
            logoSrc = require('../../../assets/logo/issuers/ocbc/ocbc.png');    // Logo source for OCBC.
            break;
        case 'dbs':
            logoSrc = require('../../../assets/logo/issuers/dbs/dbs.png');      // Logo source for DBS.
            break;
        default:
            break;
    }
    return logoSrc;             // Return the logo source.
}

// Function to retrieve the logo source for a specific card type and issuer.
function getCardLogo(issuer: string, type: string) {
  let logoSrc = null;          // Variable to store the logo source (initialized as null).
  switch (`${issuer}_${type}`) {
    case 'ocbc_365':
      logoSrc = require('../../../assets/logo/issuers/ocbc/365.png');          // Logo source for OCBC 365 card.
      break;
    case 'ocbc_frank credit':
      logoSrc = require('../../../assets/logo/issuers/ocbc/frank_credit.png'); // Logo source for OCBC Frank Credit card.
      break;
    case 'dbs_live fresh':
      logoSrc = require('../../../assets/logo/issuers/dbs/live_fresh.png');    // Logo source for DBS Live Fresh card.
      break;
    default:
      break;
  }
  return logoSrc;             // Return the logo source.
}

// Export the functions for logo retrieval.
export { getCardIssuerLogo, getCardLogo };