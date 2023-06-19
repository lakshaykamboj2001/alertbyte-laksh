import React, { useState,useEffect } from 'react';
import Link from 'next/link'; 
import { FaArrowRight } from 'react-icons/fa';

const MegaMenu= ()=>{
  const [activeTab, setActiveTab] = useState(1);
    const handleTabHover = (tabNumber) => {
      setActiveTab(tabNumber);
    };

    // hide mega-menu on child link click
    const dropdownMenu = typeof document !== 'undefined' && document.querySelector('.dropdown-menu');
    const childElements = dropdownMenu && dropdownMenu.querySelectorAll('.mm-link');
    if(dropdownMenu && childElements ){
        childElements.forEach(link => {
        link.addEventListener('click', () => {
          dropdownMenu.classList.remove('show');
        });
      });
    }

    // hide mobile-menu on child link click
    const mobMenu = typeof document !== 'undefined' && document.querySelector('.mobile-menu ');
    const mobLinks = mobMenu && mobMenu.querySelectorAll('.mm-link');
    if(mobMenu && mobLinks ){
        mobLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobMenu.style.left='100%';
        });
      });
    }

    const Tab1 = () => {
      return (
        <> 
         <div className="hv-tb-cont ">
            <p className='ty-head'>By Type</p>
            <div className="row g-3">
              <div className="col-md-3">
                <Link className="os-simple mm-link" href="/defi-smart-contract-audit/">
                  <div className="img-div">
                  <img src="/images/sca_services/DefiAudit.svg" alt="DefiAudit.svg" />
                  </div>
                  <h5>DeFi</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="os-simple mm-link" href="/nft-smart-contract-audit/">
                  <div className="img-div">
                  <img src="/images/sca_services/NFTAudit.svg" alt="NFTAudit.svg" />
                  </div>
                  <h5>NFT</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/token-smart-contract-audit/">
                  <div className="img-div">
                  <img src="/images/sca_services/TokenAudit.svg" alt="TokenAudit.svg" />
                  </div>
                  <h5>Token</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/dapp-smart-contract-audit/">
                  <div className="img-div">
                  <img src="/images/sca_services/DAppAudit.svg" alt="DAppAudit.svg" />
                  </div>
                  <h5>dApp</h5>
                </Link>
              </div>
            </div>
          </div>


          <div className="hv-tb-cont">
            <p className='ty-head'>By Language</p>
            <div className="row g-3">
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/solidity-smart-contract-audit/">
                  <div className="img-div">
                  <img src="/images/sca_services/solidity.png" alt="solidity.png" />
                  </div>
                  <h5>Solidity</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/rust-smart-contract-audit/">
                <div className="img-div">
                  <img src="/images/sca_services/rust.png" alt="rust.png" />
                  </div>
                  <h5>Rust</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/teal-smart-contract-audit/">
                <div className="img-div">
                  <img src="/images/sca_services/teal.svg" alt="teal" />
                  </div>
                  <h5>Teal</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/haskell-smart-contract-audit/">
                <div className="img-div">
                  <img src="/images/sca_services/haskell.svg" alt="haskell" />
                  </div>
                  <h5>Haskell</h5>
                </Link>
              </div>
            
            </div>
          </div>


          <div className="hv-tb-cont">
            <p className='ty-head'>By Ecosystem</p>
            <div className="row g-3">
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="ethereum-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/ethereum.png" alt="ethereum.png" />
                  </div>
                  <h5>Ethereum</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/bsc-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/bsc.png" alt="bsc.png" />
                  </div>
                  <h5>BSC</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/polygon-smart-contract-audit/">
                <div className="img-div">
                  <img src="/images/sca_services/polygon.png" alt="polygon.png" />
                  </div>
                  <h5>Polygon</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/avalanche-smart-contract-audit">
                <div className="img-div">
                  <img src="/images/sca_services/avalanche.png" alt="avalanche.png" />
                  </div>
                  <h5>Avalache</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/near-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/near.png" alt="near.png" />
                  </div>
                  <h5>Near</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/solana-smart-contract-audit">
                <div className="img-div">
                    <img src="/images/sca_services/solana.png" alt="solana.png" />
                  </div>
                  <h5>Solana</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/aurora-smart-contract-audit">
                <div className="img-div">
                    <img src="/images/sca_services/aurora.png" alt="aurora.png" />
                  </div>
                  <h5>Aurora</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/arbitrum-smart-contract-audit/">
                  <div className="img-div">
                    <img src="/images/sca_services/arbitium.png" alt="" />
                  </div>
                  <h5>Arbitrum</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/optimism-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/optimism.png" alt="optimism.png" />
                  </div>
                  <h5>Optimism</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/fantom-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/fantom.png" alt="fantom.png" />
                  </div>
                  <h5>Fantom</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/algorand-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/algorand.png" alt="algorand.png" />
                  </div>
                  <h5>Algorand</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/celo-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/celo.png" alt="celo.png" />
                  </div>
                  <h5>Celo</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/zksync-era-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/zksync.png" alt="zksync.png" />
                  </div>
                  <h5>zkSync Era</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/cardano-smart-contract-audit/">
                <div className="img-div">
                    <img src="/images/sca_services/cardano.png" alt="cardano.png" />
                  </div>
                  <h5>Cardano</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/polkadot-smart-contract-audit/">
                <div className="img-div">
                  <img src="/images/sca_services/polkadot.png" alt="polkadot.png" />
                  </div>
                  <h5>PolkaDOT</h5>
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    };
    const Tab2 = () => {
      return <></>;
    };
    const Tab3 = () => {
      return (
        <>
          <div className="hv-tb-cont">
            <div className="row g-3">
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/mobile-app-penetration-testing-services/">
                  <div className="img-div">
                   <img  src="/images/penetration/mob.svg" alt="" />
                  </div>
                  <h5>Mobile</h5>
                </Link>
              </div>
              <div className="col-md-3">
                <Link className="mm-link os-simple" href="/web-app-penetration-testing-services/">
                  <div className="img-div">
                  <img  src="/images/penetration/web.svg" alt="" />
                  </div>
                  <h5>Web</h5>
                </Link>
              </div>
            </div>
          </div>
        </>
      );
      };
      const Tab4 = () => {
        return <></>;
      };
      const Tab5 = () => {
        return <></>;
      };
      
  return(
    <>
     <div className="mega-menu">
        <div className="row">
          <div className="col-5">
            <ul className="list-unstyled mm-left-ul ">
              <li>
                <div className={`${activeTab === 1 ? 'active' : ''}`} onMouseOver={() => handleTabHover(1)}>
                  <Link href="/smart-contract-audit/" >
                    <div className="testi-author mm-left mm-link">
                      <div className="img-div ta-img ihc-img">
                        <img className="img-og" src="/images/home/our-services/smart-contract-audit.svg" alt="" />
                        <img className="img-hvr" src="/images/home/our-services/smart-contract-audit-hover.svg" alt="" />
                      </div>
                      <div className="ta-text">
                        <h5 className="od-title author-name">Smart Contract Audit<span><FaArrowRight /></span></h5>
                        <span className="author-role">Making Web3 projects safer with our pioneering security audits.</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`${activeTab === 2 ? 'active' : ''}`} onMouseOver={() => handleTabHover(2)}>
                  <Link href="/blockchain-security-audit-services/">
                    <div className="testi-author mm-left mm-link">
                    <div className="img-div ta-img ihc-img">
                      <img className="img-og" src="/images/home/our-services/blockchain-security-services.svg" alt="" />
                      <img className="img-hvr" src="/images/home/our-services/blockchain-security-services-hover.svg" alt="" />
                    </div>
                    <div className="ta-text">
                      <h5 className="od-title author-name">Blockchain Security Services</h5>
                      <span className="author-role">Secure your blockchain's architecture for users to build upon.</span>
                    </div>
                    </div>
                  </Link>
                </div>
              </li>
              <li>
                <div className={`${activeTab === 3? 'active' : ''}`} onMouseOver={() => handleTabHover(3)} >
                    <Link href="/penetration-testing-services/" >
                      <div className="testi-author mm-left mm-link">
                      <div className="img-div ta-img ihc-img">
                        <img className="img-og" src="/images/home/our-services/penetration-testing.svg" alt="" />
                        <img className="img-hvr" src="/images/home/our-services/penetration-testing-hover.svg" alt="" />
                      </div>
                      <div className="ta-text">
                        <h5 className="od-title author-name">Penetration Testing<span><FaArrowRight/></span></h5>
                        <span className="author-role">Pen-testing to test your application’s resilience against attacks.</span>
                      </div>
                      </div>
                   </Link>
                </div>
              </li>
              <li>
                <div className={`${activeTab === 4 ? 'active' : ''}`} onMouseOver={() => handleTabHover(4)}>
                  <Link href="/web3-security-consulting-services/">
                    <div className="testi-author mm-left mm-link">
                    <div className="img-div ta-img ihc-img">
                      <img className="img-og" src="/images/home/our-services/web3-security-consulting.svg" alt="" />
                      <img className="img-hvr" src="/images/home/our-services/web3-security-consulting-hover.svg" alt="" />
                    </div>
                    <div className="ta-text">
                      <h5 className="od-title author-name">Web 3 Security Consulting</h5>
                      <span className="author-role">Guidance from industry professionals in securing Web3 projects.</span>
                    </div>
                    </div>
                  </Link>
                </div>
              </li>
              <li>
               <div className={`${activeTab === 5 ? 'active' : ''}`} onMouseOver={() => handleTabHover(5)}>
                  <Link href="/digital-assets-security-services/">
                    <div className="testi-author mm-left mm-link">
                    <div className="img-div ta-img ihc-img">
                      <img className="img-og" src="/images/home/our-services/digital-asset-security.svg" alt="" />
                      <img className="img-hvr" src="/images/home/our-services/digital-asset-security-hover.svg" alt="" />
                    </div>
                    <div className="ta-text">
                      <h5 className="od-title author-name">Digital Asset Security</h5>
                      <span className="author-role">Track and trace blockchain with our risk monitoring system.</span>
                    </div>
                    </div>
                  </Link>
               </div>
              </li>
            </ul>
          </div>
          <div className="col-7">
            <div className="mm-content">
              {activeTab === 1 && <Tab1 />}
              {activeTab === 2 && <Tab2 />}
              {activeTab === 3 && <Tab3 />}
              {activeTab === 4 && <Tab4 />}
              {activeTab === 5 && <Tab5 />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MegaMenu;

 