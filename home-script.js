window.onload = (() => {
  document.getElementById('username-display').innerText = 'Hi ' + localStorage.getItem('username') + '!';
  displayPosts();
});
 
function composeEntry() {
  var message = prompt('What do you want to share?');
  var isAnonymous = document.getElementById('isAnonymous').checked;
  console.log(posts);
  if (message != '') posts.push({
    'message': message,
    'isAnonymous': isAnonymous,
    'author': localStorage.getItem('username'),
    'tag': '#FW' + (posts.length + 1),
    'likes': [],
  });
  displayPosts();
}
 
function displayPosts() {
  document.getElementById('feed').innerHTML = '';
  posts.forEach(post => {
    var searchTerm = document.getElementById('search').value;
    if (post.message.includes(searchTerm) || post.tag.includes(searchTerm)) {
      var feedItem = document.createElement('div');
      feedItem.setAttribute('class', 'card card-body');
 
      var message = document.createElement('p');
      message.innerText = post.message;
      feedItem.append(message);
 
      var tag = document.createElement('h6');
      tag.innerText = ' ' + post.tag;
      tag.setAttribute('class', 'text-muted');
      feedItem.append(tag);
 
      var author = document.createElement('h6');
      if (post.isAnonymous) author.innerText = 'Anonymous';
      else author.innerText = post.author;
      feedItem.append(author);
 
      var interactionContainer = document.createElement('div');
      interactionContainer.setAttribute('class', 'interaction-container');
 
      var numberOfLikes = document.createElement('span');
      numberOfLikes.innerText = '👍 ' + post.likes.length;
      numberOfLikes.setAttribute("class", ".interaction-container-item");
      interactionContainer.append(numberOfLikes);
 
      var likeButton = document.createElement('a');
      likeButton.href = 'javascript:void(0)';
      if (post.likes.includes(localStorage.getItem('username'))) likeButton.innerText = 'Unlike';
      else likeButton.innerText = 'Like';
      likeButton.addEventListener('click', function () {
        if (post.likes.includes(localStorage.getItem('username'))) {
          post.likes.splice(post.likes.indexOf(localStorage.getItem('username')), 1);
        } else {
          post.likes.push(localStorage.getItem('username'));
        }
        displayPosts();
      });
      likeButton.setAttribute("class", ".interaction-container-item");
      interactionContainer.append(likeButton);
 
      if (post.author == localStorage.getItem('username')) {
        var editButton = document.createElement('a');
        editButton.href = 'javascript:void(0)';
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', function () {
          var editedMessage = prompt('Update message', post.message);
          if (editedMessage) {
            posts[posts.indexOf(post)].message = editedMessage;
            displayPosts();
          }
        });
        editButton.setAttribute("class", ".interaction-container-item");
        interactionContainer.append(editButton);
 
        var deleteButton = document.createElement('a');
        deleteButton.href = 'javascript:void(0)';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
          posts.splice(posts.indexOf(post), 1);
          displayPosts();
        });
        deleteButton.setAttribute("class", ".interaction-container-item");
        interactionContainer.append(deleteButton);
      } else {
        interactionContainer.append(document.createElement('div'));
        interactionContainer.append(document.createElement('div'));
      }
 
      feedItem.append(interactionContainer);
 
      document.getElementById('feed').prepend(document.createElement('br'));
      document.getElementById('feed').prepend(feedItem);
    }
  });
}