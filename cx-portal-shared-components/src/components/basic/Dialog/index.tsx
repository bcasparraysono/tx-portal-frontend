/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog'

interface AddtionalDialogProps {
  modalBorderRadius?: number
  additionalModalRootStyles?: any
}

export type DialogProps = Pick<
  MuiDialogProps,
  'children' | 'open' | 'scroll' | 'sx'
>

export const Dialog = ({
  scroll = 'body',
  modalBorderRadius,
  additionalModalRootStyles = {},
  ...props
}: DialogProps & AddtionalDialogProps) => {
  const radius =
    modalBorderRadius && modalBorderRadius !== 0 ? modalBorderRadius : 20
  return (
    <MuiDialog
      {...props}
      scroll={scroll}
      sx={{
        '.MuiPaper-root': {
          borderRadius: `${radius}px !important`,
          ...additionalModalRootStyles,
        },
      }}
    />
  )
}
