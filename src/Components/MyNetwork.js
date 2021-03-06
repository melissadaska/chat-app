import React, { Component } from 'react';
import Talk from 'talkjs';
import { dummyUsers } from './Users';

class MyNetwork extends Component {
    constructor(props) {
        super(props);
        let currentUser;
        const currentTalkjsUser = localStorage.getItem('currentTalkjsUser');
        if (currentTalkjsUser) {
            currentUser = JSON.parse(currentTalkjsUser)
        }
        this.state = {
            currentUser
        }
    }

    handleClick(userId) {
        // Get two users that will be in conversation
        const { currentUser } = this.state;
        const user = dummyUsers.find(user => user.id === userId)

        // session initialization code
        Talk.ready
        .then(() => {
            // Create two users that will be in conversation
            const me = new Talk.User(currentUser);
            const other = new Talk.User(user)

            // Create talk session if does not exist.
            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: 'tg57V1o1',
                    me: me
                });
            }

            // Get conversation or create one
            const conversationId = Talk.oneOnOneId(me, other);
            const conversation = window.talkSession.getOrCreateConversation(conversationId);

            // Set participants of conversation
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            // Create and mount chatbox in container
            this.chatbox = window.talkSession.createChatbox(conversation);
            this.chatbox.mount(this.container);
        })
        .catch(e => console.error(e));
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div className='users'>
                <div className='current-user-container'>
                    {currentUser && 
                    <div>
                        <picture className='current-user-picture'>
                            <img alt={currentUser.name} src={currentUser.photoUrl} />
                        </picture>
                        <div className='current-user-info'>
                            <h3>{currentUser.name}</h3>
                            <p>{currentUser.description}</p>
                        </div>
                    </div>
                    }
                </div>
                <div className='users-container'>
                    <ul>
                        { dummyUsers.map(user =>
                          <li key={user.id} className='user'>
                              <picture className='user-picture'>
                                  <img src={user.photoUrl} alt={`$user.name`} />
                              </picture>
                            <div className='user-into-container'>
                                <div className='user-info'>
                                    <h4>{user.name}</h4>
                                    <p>{user.info}</p>
                                </div>
                                <div className='user-action'>
                                <button onClick={(userId) => this.handleClick(user.id)}>Message</button>
                                </div>
                            </div>
                          </li>  
                        )}
                    </ul>
                    <div className="chatbox-container" ref={c => this.container = c}>
                        <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyNetwork;
