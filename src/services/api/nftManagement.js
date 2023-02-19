import axios from 'axios';

const MoralisKey = process.env.VUE_APP_MORALIS_API_KEY;
const GetNFT = process.env.VUE_APP_MORALISE_GETNFTS;
const Network = process.env.VUE_APP_NETWORK;

export default {
  saveNftdata(account, vrcode, nftid, nft_mint_status, logo, logoext, featured, banner, itemimage, publicmint, isdraft, title, description, contract, category, royalty, collaborators, ratespercollaborators, item_title, supply, mintdate, mintprice, weblink, discord, instagram, medium, telegram) {
    return axios.post('/nft/save-collection/save-nft-data', {
      account,
      vrcode,
      nftid,
      nft_mint_status,
      logo,
      logoext,
      featured,
      banner,
      itemimage,
      publicmint,
      isdraft,
      title,
      description,
      contract,
      category,
      royalty,
      collaborators,
      ratespercollaborators,
      item_title,
      supply,
      mintdate,
      mintprice,
      weblink,
      discord,
      instagram,
      medium,
      telegram
    });
  },
  saveNftdatabeta(account, vrcode, logo, title, description) {
    return axios.post('/nft/save-collection/save-nft-data-beta/', {
      account,
      vrcode,
      logo,
      title,
      description
    });
  },
  setItem(flagforsale, explicit, collection, title, description, logo, ext, animation_url, animation_url_ext, metadata, creator, tokenId, properties, levels, stats) {
    return axios.post('/nft/setitem', {
      flagforsale,
      explicit,
      collection,
      title,
      description,
      logo,
      ext,
      animation_url,
      animation_url_ext,
      metadata,
      creator,
      tokenId,
      properties,
      levels,
      stats,
    });
  },
  updateItem(flagforsale, explicit, collection, title, description, logo, ext, animation_url, animation_url_ext, metadata, condition, properties, levels, stats) {
    return axios.post('/nft/updateItem', {
      flagforsale,
      explicit,
      collection,
      title,
      description,
      logo,
      ext,
      animation_url,
      animation_url_ext,
      metadata,
      condition,
      properties,
      levels,
      stats,
    });
  },
  setSaleStatus(collection, metadata) {
    return axios.post('/nft/setsaleStatus/', {
      collection,
      metadata
    });
  },
  setAuctionData(collection, metadata, duration) {
    return axios.post('/nft/setAuctionData/', {
      collection,
      metadata,
      duration
    });
  },
  settokenid(collection, metadata, tokenid) {
    return axios.post('/nft/settokenid/', {
      collection,
      metadata,
      tokenid
    });
  },
  setTrack(collection, tokenid, current_address) {
    return axios.post('/nft/setTrack/', {
      collection,
      tokenid,
      current_address,
    });
  },
  setTrack_Contract(contract, tokenid, current_address) {
    return axios.post('/nft/setTrack_Contract/', {
      contract,
      tokenid,
      current_address,
    });
  },
  toggle_sale_status(collection, tokenid, status) {
    return axios.post('/nft/toggle_sale_status', {
      collection,
      tokenid,
      status
    });
  },
  toggle_sale_status_Contract(contract, tokenid, status) {
    return axios.post('/nft/toggle_sale_status_Contract', {
      contract,
      tokenid,
      status
    });
  },
  getNFTItemByCollection(collection) {
    return axios.post('/nft/getNFTitembycollection', {
      collection
    });
  },
  getNFTItemByContractAddress(contract) {
    return axios.post('/nft/getNFTitembycontractaddress', {
      contract
    });
  },
  getPublicOrGeneralTickets(type) {
    return axios.post('/nft/getPublicOrGeneralTickets', {
      type
    });
  },
  getAllCollections() {
    return axios.post('/nft/getAllCollections');
  },
  getmintabledate(collection) {
    return axios.post('/nft/getmintabledate', {
      collection
    });
  },
  checkcollection(collection) {
    return axios.post('/nft/checkcollection', {
      collection
    });
  },
  checkitem(collection, item) {
    return axios.post('/nft/checkitem', {
      collection,
      item
    });
  },
  getNFTItemProperties(contract, item) {
    return axios.post('/nft/getNFTItemProperties', {
      contract,
      item
    });
  },
  getNFTItemLevels(contract, item) {
    return axios.post('/nft/getNFTItemLevels', {
      contract,
      item
    });
  },
  getNFTItemStats(contract, item) {
    return axios.post('/nft/getNFTItemStats', {
      contract,
      item
    });
  },
  getNFTItemDatas(contract, item) {
    return axios.post('/nft/getNFTItemDatas', {
      contract,
      item
    });
  },
  getNFTSByCollection(collection) {
    return axios.post('/nft/getNFTSByCollection', {
      collection
    });
  },
  setpublicmintstatus(account, vrcode, status, collection) {
    return axios.post('/nft/setpendingmintstatus', {
      account,
      vrcode,
      status,
      collection
    });
  },
  getpublicmintstatus(collection) {
    return axios.get(`/nft/getpendingmintstatus/${collection}`);
  },
  getNFTsByOwner(owner) {
    return axios.get(
      `${GetNFT}/${owner}/nft?chain=${Network}&format=decimal`,
      { headers: { 'x-api-key': MoralisKey } }
    );
  },
  getlatestItem(collection) {
    return axios.post(`/nft/getlatestItem`, {
      collection,
    });
  },
  getNFTsByOwnerfromdb(account, vrcode) {
    return axios.post('/nft/get-mycollection', {
      account,
      vrcode
    });
  },
  changeNftSaleStatus(account, nft_assets_path) {
    return axios.post('/nft/save-collection/change-nft-sale-status', {
      account,
      nft_assets_path
    });
  },
  buyNftItem(nft_assets_path, account) {
    return axios.post('/nft/save-collection/buy-nft-item', {
      nft_assets_path,
      account
    });
  },
  moralisGetNFTMetadata(contractAddress, tokenId) {
    return axios.get(
      `${GetNFT}/nft/${contractAddress}/${tokenId}?chain=${Network}&format=decimal`,
      { headers: { 'X-API-Key': MoralisKey } }
    );
  },
};
