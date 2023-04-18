import React, { useState } from 'react'
import ChatBotImg from "../../assets/chatbot.png";
import GuestImg from "../../assets/guest.png";
import getGithubProfile from '../../hooks/fetch';

const ChatBot = () => {
  const [Open, setOpen] = useState(false);
  const [GuestMsg, setGuestMsg] = useState('');
  const [ChatBotState, setChatBotState] = useState(0);
  const [Messages, setMessages] = useState([
    {
      Text: "Hey there! I am a ChatBot! Type start to begin...",
      Bot: true
    }
  ]);
  const [GitHubUser, setGitHubUser] = useState(null);

  function toggleChatBox() {
    setOpen(!Open);
  };

  function handleGuestMsgChange(e) {
    setGuestMsg(e.target.value);
  };

  function botAction(text) {
    const PersonName = GitHubUser
      ? GitHubUser.name
        ? GitHubUser.name
        : GitHubUser.login
      : null;
    const LastMessage = text;

    if (
      LastMessage.toLowerCase() === "start" &&
      ChatBotState === 0
    ) {
      const Text = "Hey Guest, thanks for starting me up! Please enter your github username.";
      setChatBotState(1);
      setMessages([
        ...Messages,
        {
          Text: LastMessage,
          Bot: false
        },
        {
          Text,
          Bot: true
        }
      ]);
    }

    if (ChatBotState === 1) {
      const Text = `Thanks for providing ${LastMessage} as your GitHub username...`;
      setMessages([
        ...Messages,
        {
          Text: LastMessage,
          Bot: false
        },
        {
          Text,
          Bot: true
        },
        {
          Text: "Let's look it up with GitHub... Please wait...",
          Bot: true
        }
      ]);
      setChatBotState(2);
    };

    if (ChatBotState === 2) {
      getGithubProfile(LastMessage)
        .then(GitHubUser => {
          const PersonName = GitHubUser
            ? GitHubUser.name
              ? GitHubUser.name
              : GitHubUser.login
            : null;
          const Text = `Hey ${GitHubUser.name ? GitHubUser.name : GitHubUser.login
            }! I found you! You're awesome, coz you have got ${GitHubUser.public_repos
            } public repos! Saving your details!`;
          const NoName = {
            Text: (
              <>
                Hey, {GitHubUser.login}, it seems like you haven't set your
                name. Would you like to please set one by going to{" "}
                <a
                  href="https://github.com/settings/profile"
                  target="_blank"
                  rel="noreferrer"
                >
                  your profile settings
                </a>{" "}
                after you login?
              </>
            ),
            Bot: true
          };
          const MessagesList = [
            ...Messages,
            {
              Text,
              Bot: true
            },
            {
              Text: (
                <>
                  So what do you want to do now? Please enter one of the options
                  here:
                  <br />- help: Displays this message again.
                  <br />- bio: Displays the GitHub Bio, if found.
                  <br />- company: Displays the Company, if found.
                  <br />- avatar: Displays the GitHub Avatar, if found.
                  <br />- blog site: Displays the Blog Link, if found.
                  <br />- location: Displays the Location, if found.
                  <br />- can hire: Tells if the person can be hired.
                  <br />- followers: Displays the number of followers of{" "}
                  {PersonName}
                  .
                  <br />- following: Displays the number of people {
                    PersonName
                  }{" "}
                  follows.
                  <br />- reset: Back to Square one! 😉
                </>
              ),
              Bot: true
            }
          ];
          if (!GitHubUser.name) {
            MessagesList.push(NoName);
          }
          setGitHubUser(GitHubUser);
          setChatBotState(3);
          setMessages(MessagesList);
        });
    }

    if (ChatBotState === 3) {
      switch (LastMessage) {
        case "help":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: (
                <>
                  So what do you want to do now? Please enter one of the
                  options here:
                  <br />- help: Displays this message again.
                  <br />- bio: Displays the GitHub Bio, if found.
                  <br />- company: Displays the Company, if found.
                  <br />- avatar: Displays the GitHub Avatar, if found.
                  <br />- blog site: Displays the Blog Link, if found.
                  <br />- location: Displays the Location, if found.
                  <br />- can hire: Tells if the person can be hired.
                  <br />- followers: Displays the number of followers of{" "}
                  {PersonName}
                  .
                  <br />- following: Displays the number of people{" "}
                  {PersonName} follows.
                  <br />- reset: Back to Square one! 😉
                </>
              ),
              Bot: true
            }
          ]);
          break;
        case "bio":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: GitHubUser.bio
                ? GitHubUser.bio
                : `${PersonName} hasn't updated their bio.`,
              Bot: true
            }
          ]);
          break;
        case "company":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: GitHubUser.company
                ? `${PersonName} works at ${GitHubUser.company}`
                : `${PersonName} hasn't updated their company.`,
              Bot: true
            }
          ]);
          break;
        case "avatar":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: (
                <>
                  <img
                    src={GitHubUser.avatar_url}
                    alt={`${GitHubUser.login}'s Avatar`}
                  />
                </>
              ),
              Bot: true
            }
          ]);
          break;
        case "website":
        case "blog site":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: GitHubUser.blog ? (
                <>
                  {PersonName} writes at{" "}
                  <a
                    href={GitHubUser.blog}
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>
                  ...
                </>
              ) : (
                `${PersonName} hasn't got a blog or website.`
              ),
              Bot: true
            }
          ]);
          break;
        case "location":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: GitHubUser.location
                ? `${PersonName} lives in ${GitHubUser.location}`
                : `${PersonName} lives somewhere we don't know.`,
              Bot: true
            }
          ]);
          break;
        case "can hire":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: `${PersonName} is${GitHubUser.hireable ? "" : " not"
                } available for hire.`,
              Bot: true
            }
          ]);
          break;
        case "followers":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: `${PersonName} has got ${GitHubUser.followers} followers.`,
              Bot: true
            }
          ]);
          break;
        case "following":
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: `${PersonName} follows ${GitHubUser.following} users.`,
              Bot: true
            }
          ]);
          break;
        case "reset":
        default:
          setGitHubUser(null);
          setChatBotState(0);
          setMessages([
            ...Messages,
            {
              Text: LastMessage,
              Bot: false
            },
            {
              Text: "Thanks for using my service. Please type start to begin once again...",
              Bot: true
            }
          ]);
          break;
      }
    }
  };

  function handleGuestMsgSubmit(e) {
    e.preventDefault();
    const Text = GuestMsg;
    setGuestMsg('');
    botAction(Text);
  };

  const PersonName = GitHubUser
    ? GitHubUser.name
      ? GitHubUser.name
      : GitHubUser.login
    : null;
  return (
    <div className="chatbot-wrapper">
      {Open && (
        <div className="chatbot-messages">
          <ul id="messages">
            {Messages.map((msg, key) => (
              <li key={key} className={msg.Bot ? "chatbot" : "guest"}>
                <img
                  src={
                    msg.Bot
                      ? ChatBotImg
                      : GitHubUser
                        ? GitHubUser.avatar_url
                        : GuestImg
                  }
                  alt={msg.Bot ? "chatbot" : "guest"}
                />
                <p>{msg.Text}</p>
              </li>
            ))}
          </ul>
          <form
            className="chatbot-input"
            onSubmit={handleGuestMsgSubmit}
          >
            <input
              type="text"
              value={GuestMsg}
              onChange={handleGuestMsgChange}
              placeholder={
                GitHubUser
                  ? `Please write something ${PersonName}...`
                  : "Please start typing something..."
              }
            />
          </form>
        </div>
      )}
      <div className="chatbot-trigger">
        <img src={ChatBotImg} alt="Open Chat" onClick={toggleChatBox} />
      </div>
    </div>
  )
}

export default ChatBot