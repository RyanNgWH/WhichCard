
function getCardIssuerLogo(issuer: string) {
    let logoSrc;
    switch (issuer) {
        case 'ocbc':
            logoSrc = require('../../../assets/logo/issuers/ocbc/ocbc.png');
            break;
        case 'dbs':
            logoSrc = require('../../../assets/logo/issuers/dbs/dbs.png');
            break;
        default:
            break;
        }
    return logoSrc;
}

function getCardTypeLogo(issuer: string, type: string) {
  let logoSrc = null;
  switch (`${issuer}_${type}`) {
    case 'ocbc_365':
      logoSrc = require('../../../assets/logo/issuers/ocbc/365.png');
      break;
    case 'ocbc_frank_credit':
      logoSrc = require('../../../assets/logo/issuers/ocbc/frank_credit.png');
      break;
    default:
      break;
  }
  return logoSrc;
}

export { getCardIssuerLogo, getCardTypeLogo };