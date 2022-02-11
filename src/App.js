import './App.css';
import {Component} from 'react';
import Logo from './images/logo.svg';
import workerImage from './images/illustration-working.svg';
import IconState from './images/icon-brand-recognition.svg';
import IconDetailed from './images/icon-detailed-records.svg';
import IconDraw from './images/icon-fully-customizable.svg';
import LogoWhite from './images/LogoWhite.svg';
import InstagramIcon from './images/instagram.svg';
import instagramGradientIcon from './images/instagramGradient.svg';
import MenuIcon from './images/MenuIcon.svg';
import MenuCard from './MenuCard';

class App extends Component
{
  state = {
    IconSelected : InstagramIcon,
    ShortenLinks : [],
    LongLinks : "",
    numbers : 0
  }
  AllShortLinks = []
 
  a = true
  render(){
    const OnOverInSocialMediaLinks = e=>{
      let pathFacebook = document.querySelector(".SectionFour .SocialMediaList .svgFacebook path");
      let pathTwitter = document.querySelector(".SectionFour .SocialMediaList .svgTwitter path");
      let pathPinterst = document.querySelector(".SectionFour .SocialMediaList .svgPinterest path");
      let pathInstagram = document.querySelector(".SectionFour .SocialMediaList .svgInstagram path");
      
      let svgFacebook = document.querySelector(".SectionFour .SocialMediaList .svgFacebook");
      let svgPinterst = document.querySelector(".SectionFour .SocialMediaList .svgPinterest");
      let svgInstagram = document.querySelector(".SectionFour .SocialMediaList .svgInstagram");
      
      if(e.target.classList[0]==="svgFacebook"||e.target.classList[0]==="FacebookIcon"){
        pathFacebook.classList.add("FacebookOnHover")
        svgFacebook.classList.add("FacebookSvgOnHover")
      }
      if(e.target.classList[0]==="svgTwitter"||e.target.classList[0]==="TwitterIcon"){
        pathTwitter.classList.add("TwitterOnHover")
      }
      if(e.target.classList[0]==="svgPinterest"||e.target.classList[0]==="PinterestIcon"){
        pathPinterst.classList.add("PinterestOnHover")
        svgPinterst.classList.add("PinterestSvgOnHover")
      }
      if(e.target.classList[0]==="svgInstagram"||e.target.classList[0]==="InstagramIcon"){
        pathInstagram.classList.add("InstagramOnHover")
        svgInstagram.classList.add("InstagramSvgOnHover")
      }

    }
    const OnDisOverInSocialMediaLinks = e => {
      let pathFacebook = document.querySelector(".SectionFour .SocialMediaList .svgFacebook path");
      let pathTwitter = document.querySelector(".SectionFour .SocialMediaList .svgTwitter path");
      let pathPinterst = document.querySelector(".SectionFour .SocialMediaList .svgPinterest path");
      let pathInstagram = document.querySelector(".SectionFour .SocialMediaList .svgInstagram path");
      
      let svgFacebook = document.querySelector(".SectionFour .SocialMediaList .svgFacebook");
      let svgPinterst = document.querySelector(".SectionFour .SocialMediaList .svgPinterest");
      let svgInstagram = document.querySelector(".SectionFour .SocialMediaList .svgInstagram");

      if(e.target.classList[0]==="svgFacebook"||e.target.classList[0]==="FacebookIcon"){
        pathFacebook.classList.remove("FacebookOnHover");
        svgFacebook.classList.remove("FacebookSvgOnHover");
      }
      else if(e.target.classList[0]==="svgTwitter"||e.target.classList[0]==="TwitterIcon"){
        pathTwitter.classList.remove("TwitterOnHover");
      }
      else if(e.target.classList[0]==="svgPinterest"||e.target.classList[0]==="PinterestIcon"){
        pathPinterst.classList.remove("PinterestOnHover");
        svgPinterst.classList.remove("PinterestSvgOnHover");
      }
      else if(e.target.classList[0]==="svgInstagram"||e.target.classList[0]==="InstagramIcon"){
        pathInstagram.classList.remove("InstagramOnHover");
        svgInstagram.classList.remove("InstagramSvgOnHover");
      }
    }
    const OnInstagramOverIcon = e => {
      this.setState({
        IconSelected : instagramGradientIcon
      })
    }
    const OnInstagramLeaveIcon = e => {
      this.setState({
        IconSelected : InstagramIcon
      })
    }
  
    const OnSubmitFormulaire = e => {
      e.preventDefault();
      let ValueEntered = document.querySelector(".SecondSection form input");
      let ShortenButton = document.querySelector(".ShortenButton");
      let errorMessage = document.querySelector(".errorMessage .ContainerOfErrorMessage")

      if(!ShortenButton){
        return;
      }
      ShortenButton.classList.replace("ShortenButton","ShortenButtonDisabled");
      fetch(`https://api.shrtco.de/v2/shorten?url=${ValueEntered.value}`)
      .then(response=>{
        response.json().then(res=>{
          if(res.ok){
            console.log(res);
            console.log("requette bien etablie et bien reussi");
            ValueEntered.classList.remove("InputError")
            errorMessage.textContent = "";
            this.AllShortLinks.push(res.result)
            console.log(this.AllShortLinks)
            this.setState({
              ShortenLinks : this.AllShortLinks
            })

          }
          else{
            console.log("une erreur a fait planté le programme");
            ValueEntered.classList.add("InputError")
            if(ValueEntered.value===""){
              errorMessage.textContent = "Le champ de texte est vide";
            }
            else if(ValueEntered.value!==""){
              errorMessage.textContent = "L'adresse que vous avez entrée n'est pas valide";
            }
            else{
              errorMessage.textContent = "une erreur est survenue"
            }
          }
          ShortenButton.classList.replace("ShortenButtonDisabled","ShortenButton");
        })
      }).catch(function(){
        errorMessage.textContent = "une erreur est survenue,Veuillez verifier votre connexion internet";
        ShortenButton.classList.replace("ShortenButtonDisabled","ShortenButton");
        ValueEntered.classList.add("InputError")
      })
    }
    const OnClickInCopyButton = e => {
      e.target.classList.replace("CopyButton","CopiedButton");
      e.target.textContent = "Copied!"
      let AddressToCopy = e.target.parentElement.children[0];
     
      var range = document.createRange();
      var selection = window.getSelection();

      range.selectNode(AddressToCopy);
      selection.removeAllRanges();
      selection.addRange(range);
      console.log(e.target.parentElement.children[0])
      
      document.execCommand('copy')
    }
    
    const LinksReturn = props => {
      return(
        <div className = {`resultOfRequist ${this.numbers}`}>
          <div className = "RealLongLink">
            <p>{props.LongLink}</p>
          </div>
          <div className = "ShortLinkAndButton">
            <p className = "ShortLink">{props.ShortLink}</p>
            <button onClick = {OnClickInCopyButton} className = "btn CopyButton">Copy</button>
          </div>
        </div>
      )
      
    }
    const OnClickInMenuBarPhone = e => {
      let ContainerForAWorkerImage = document.querySelector(".FirstSection .ContainerForAWorkerImage");
      let GlobalMenuBare = document.querySelector("header .GlobalMenuBar");
      let MenuBare = document.querySelector("header .MenuCard");

      GlobalMenuBare.classList.remove("none")

      if(MenuBare){
        GlobalMenuBare.classList.add("MoveCardAnimation");
        GlobalMenuBare.classList.remove("ReturnMoveCardAnimation");
        GlobalMenuBare.classList.remove("MenuCard")
        console.log("Trouvé !! on va le faire disparaitre")
        ContainerForAWorkerImage.classList.replace("RightPart","RightPartDisabled")
      }
      else{
        GlobalMenuBare.classList.add("MenuCard")
        GlobalMenuBare.classList.add("ReturnMoveCardAnimation");
        GlobalMenuBare.classList.remove("MoveCardAnimation");
        console.log("On va le faire apparaitre")
        ContainerForAWorkerImage.classList.replace("RightPartDisabled","RightPart")
      }
    }
    
    return(
      <>
        <header>
          <div className = "MenuHeaderPart">
            <div className = "ContainerOfLogoAndFirstMenuBar">
                <img alt = "Logo principale" className = "LogoPrincipale" src = {Logo}/>    
              <div className = "MenuBarForPhone" onClick = {OnClickInMenuBarPhone}>
                <img alt="Menu Icon" src = {MenuIcon}/>  
              </div>  
              <div className = "FirstMenuBar">
                <ul className = "PropositionMenuBar">
                  <button><li>Features</li></button>
                  <button><li>Pricing</li></button>
                  <button><li>Resources</li></button>
                </ul>
              </div>
              <div className = "SecondMenubar">
              <ul className = "PropositionMenuBarTwo">
                <button className = "LoginButtonLink"><li>Login</li></button>
                <button className = "SignUpButtonLink"><li>Sign up</li></button>
              </ul>
            </div>
            </div>
          </div>
          <MenuCard/>
          
        </header>
        <section className = "FirstSection">
          <div className = "LeftAndRightPart">
            <div className ="LeftPart">
              <h1>More than just shorter links</h1>
              <h3>Build your brand’s recognition and get detailed insights on how your links are performing.</h3>
              <button className = "GetStartedButton btn">Get Started</button>
            </div>  
            <div className = "RightPart ContainerForAWorkerImage">
              <img alt = "worker" src = {workerImage}/>
            </div>
          </div>
        </section>
        <section className = "SecondSection">
          <div className = "Container">
            <div className = "FirstPart">
              <div className = "TopPart">
                <form onSubmit = {OnSubmitFormulaire} className = "InputFormulaireInFirstSection">
                  <div className = "InputContainer">
                    <input placeholder = "Shorten a link here..."/>
                    <div className = "errorMessage">
                      <p className = "ContainerOfErrorMessage"></p>
                    </div>
                  </div>
                  <button className = "ShortenButton buttonShorten">Shorten it!</button>
                </form>
              </div>
              <div className = "bottomPart">
                {
                  this.state.ShortenLinks.map(result => {
                    return(
                      <LinksReturn LongLink = {result.original_link} ShortLink = {result.short_link}/>
                    )
                  })
                }
              </div>
            </div>

            <div className = "IntroductionText">
              <h2>Advanced settings</h2>
              <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
            </div>
            <div className = "InformationCards">
              <div className = "BlueLine"></div>
              <div className = "card card1">
                <div className = "IconZone">
                  <img alt = "Icon state" src = {IconState} />
                </div>
                <div className = "textZone">
                  <h3>Brand Recognition</h3>
                  <p>Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.</p>
                </div>
                <div className = "GradientCard1"></div>
              </div>
              <div className = "card card2">
                <div className = "IconZone">
                  <img alt = "Icon detailed" src = {IconDetailed} />
                </div>
                <div className = "textZone">
                  <h3>Detailed Records</h3>
                  <p>Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.</p>
                </div>
                <div className = "GradientCard2"></div>
              </div>
              <div className = "card card3">
                <div className = "IconZone">
                  <img alt = "Icon Draw" src = {IconDraw} />
                </div>
                <div className = "textZone">
                  <h3>Fully Customizable</h3>
                  <p>Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.</p>
                </div>
                <div className = "GradientCard3"></div>
              </div>
            </div>
          </div>
        </section>
        <section className = "TherdSection">
          <div className = "Container">
            <h2>Boost your links today</h2>
            <button className = "GetStartedButton btn GetStartedButtonScaller">Get Started</button>
          </div>
        </section>
        <section className = "SectionFour">
          <div className = "Container">
            <div className = "IconZone">
              <img alt = "Icon For Society" src = {LogoWhite} />
            </div>
            <div className = "AllListStyle">
              <div className = "FirstListSyleInSectionFour listStyle">
                <h3>Features</h3>
                <ul>
                  <button><li>Link shourtening</li></button>
                  <button><li>Branded links</li></button>
                  <button><li>Analytics</li></button>
                </ul>
              </div>
              <div className = "SecondListStyleInSectionFour listStyle">
                <h3>Resources</h3>
                <ul>
                  <button><li>Blog</li></button>
                  <button><li>Developers</li></button>
                  <button><li>Supports</li></button>
                </ul>
              </div>
              <div className = "TherdListStyleInSectionFour listStyle ">
                <h3>Company</h3>
                <ul className = "listeStyleThree">
                  <button><li>About</li></button>
                  <button><li>Our team</li></button>
                  <button><li>Careers</li></button>
                  <button><li>Contact</li></button>
                </ul>
              </div>
            </div>
            <div className = "SocialMediaList">
              <ul>
                <a href = "https://facebook.com"><svg onMouseLeave = {OnDisOverInSocialMediaLinks} onMouseOver = {OnOverInSocialMediaLinks} className = "svgFacebook" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path onMouseOver = {OnOverInSocialMediaLinks} className = "FacebookIcon" fill="#FFF" d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg></a>
                <a href = "https://twitter.com"><svg onMouseLeave = {OnDisOverInSocialMediaLinks} onMouseOver = {OnOverInSocialMediaLinks} className = "svgTwitter" xmlns="http://www.w3.org/2000/svg" width="24" height="20"><path onMouseOver = {OnOverInSocialMediaLinks} className = "TwitterIcon" fill="#FFF"  d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z"/></svg></a>
                <a href = "https://pinterest.com"><svg onMouseLeave = {OnDisOverInSocialMediaLinks} onMouseOver = {OnOverInSocialMediaLinks} className = "svgPinterest" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path onMouseOver = {OnOverInSocialMediaLinks} className = "PinterestIcon" fill="#FFF" d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
                <a onMouseLeave = {OnInstagramLeaveIcon} onMouseOver = {OnInstagramOverIcon} href = "https://instagram.com"><img alt = "instagram" src = {this.state.IconSelected} /></a>
              </ul>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default App;
