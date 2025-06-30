// Nouveau script pour publications (like, comment, share, sans scrollbars pour carrousels)

document.querySelectorAll('.publication').forEach(pub => {
  // Like
  const likeBtn = pub.querySelector('.pub-like-btn');
  likeBtn.addEventListener('click', () => {
    const liked = likeBtn.getAttribute('data-liked') === 'true';
    const countSpan = likeBtn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent, 10);
    if (liked) {
      likeBtn.setAttribute('data-liked', 'false');
      likeBtn.querySelector('i').classList.replace('bxs-heart', 'bx-heart');
      countSpan.textContent = count - 1;
      likeBtn.classList.remove('text-orange-600');
    } else {
      likeBtn.setAttribute('data-liked', 'true');
      likeBtn.querySelector('i').classList.replace('bx-heart', 'bxs-heart');
      countSpan.textContent = count + 1;
      likeBtn.classList.add('text-orange-600');
    }
  });
  // Comment
  const commentBtn = pub.querySelector('.pub-comment-btn');
  const commentsBlock = pub.querySelector('.pub-comments');
  commentBtn.addEventListener('click', () => {
    commentsBlock.classList.toggle('hidden');
    if (!commentsBlock.querySelector('form')) {
      const form = document.createElement('form');
      form.className = 'flex items-center gap-2 mt-2';
      form.innerHTML = `
        <input type="text" placeholder="Ajouter un commentaire..." class="flex-1 px-3 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
        <button type="submit" class="text-orange-600 font-bold">Envoyer</button>
      `;
      commentsBlock.appendChild(form);
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input');
        if (input.value.trim()) {
          const newComment = document.createElement('div');
          newComment.className = 'flex items-start gap-2';
          newComment.innerHTML = `
            <img src="../assets/profile/profile.jpg" class="w-8 h-8 rounded-full object-cover" alt="User">
            <div class="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-800">${input.value}</div>
          `;
          form.parentNode.insertBefore(newComment, form);
          input.value = '';
          // Update comment count
          const countSpan = commentBtn.querySelector('.comment-count');
          countSpan.textContent = parseInt(countSpan.textContent, 10) + 1;
        }
      });
    }
  });
  // Share
  const shareBtn = pub.querySelector('.pub-share-btn');
  shareBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href + `#pub${pub.dataset.id}`);
    shareBtn.querySelector('span').textContent = "Lien copié !";
    setTimeout(() => {
      shareBtn.querySelector('span').textContent = "Partager";
    }, 1200);
  });
});

// Masquer scrollbar pour tous les carrousels horizontaux
document.querySelectorAll('[class*="overflow-x-auto"]').forEach(el => {
  el.style.scrollbarWidth = "none";
  el.style.msOverflowStyle = "none";
  el.style.overflowY = "hidden";
});
document.querySelectorAll('[class*="overflow-x-auto"]').forEach(el => {
  el.addEventListener('wheel', e => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  }, { passive: false });
});
