import Markdown from './Markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

export default props => (
  <span className='rjsf-markdown'>
    <Markdown
      {...props}
      components={{
        // tabIndex='-1' exists to skip <a> tag links
        a: ({ node, ...restProps }) => <a tabIndex='-1' {...restProps} />
      }}
      rehypePlugins={[
        rehypeRaw,
        [
          rehypeSanitize,
          { tagNames: ['a', 'img', 'b', 'strong', 'em', 'detail', 'code'] }
        ]
      ]}
    />
  </span>
)
