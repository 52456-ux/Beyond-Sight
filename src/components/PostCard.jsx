export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <img src={post.image} alt={post.imageAlt} />
      <div className="post-card-body">
        <p className="post-meta">{post.meta}</p>
        <h3><a href={post.href}>{post.title}</a></h3>
        <p>{post.description}</p>
        <a href={post.href} className="btn btn-outline">Read more</a>
      </div>
    </article>
  );
}
