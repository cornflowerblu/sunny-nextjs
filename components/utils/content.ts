import { WebContent } from '../../types/cms/content'

export const contentBlock = (id: number, content: WebContent) =>
  content?.cms_.webContents.data
    .filter((content: WebContent) => content.id == id)
    .map((content: WebContent) => content.attributes.content)
