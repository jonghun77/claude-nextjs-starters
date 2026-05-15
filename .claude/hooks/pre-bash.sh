#!/bin/bash
# PreToolUse hook — Bash 도구 실행 전에 호출됩니다.
# stdin으로 JSON을 받아 permissionDecision을 반환합니다.

input=$(cat)
echo "테스트 훅!" >> ./hook-test.txt
command=$(echo "$input" | jq -r '.tool_input.command')

# 여기에 검사 로직을 추가하세요.
# 예: rm -rf 차단
# if echo "$command" | grep -qE 'rm\s+-.*f'; then
#   jq -n '{
#     "hookSpecificOutput": {
#       "hookEventName": "PreToolUse",
#       "permissionDecision": "deny",
#       "permissionDecisionReason": "rm -rf 명령어는 차단됩니다."
#     }
#   }'
#   exit 0
# fi

# 기본: 모든 명령어 허용
exit 0
